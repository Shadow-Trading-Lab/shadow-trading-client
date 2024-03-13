
import { ArrowUp, ArrowDown } from "lucide-react";
// import { Button } from "@/components/ui/button";

import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Badge } from "@/components/ui/badge";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import Image from "next/image";
import {
  SolanaVault,
  getCounterPDA,
  getVaultPDA,
  programID,
} from "@/utils/anchor";
// import { useSolanaProvider } from "@/hooks/solanaProvider";
import { BN, Program } from "@coral-xyz/anchor";
import idl from "@/utils/idl.json";
import { useToast } from "@/components/ui/use-toast";
import { useAnchorProvider } from "../solana/solana-provider";


export function DepositCard() {
  const { publicKey, connected, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const provider = useAnchorProvider()
  // const provider = useSolanaProvider();
  const toast = useToast();

  const [userBalance, setUserBalance] = useState(0);
  const [vaultBalance, setVaultBalance] = useState(0);
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [interactionsData, setInteractionsData] = useState<{
    totalDeposits: number;
    totalWithdrawals: number;
  }>();

  const correctAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.valueAsNumber;
        if (value < 0) {
          // If the value is negative or NaN set it to 0
          setAmount(0);
        } else if (value * LAMPORTS_PER_SOL > userBalance) {
          // If the value is greater than the user balance set it to the user balance - 0.000001 padding
          setAmount(userBalance / LAMPORTS_PER_SOL - 0.000001);
        } else {
          // Otherwise set the amount to the value
          setAmount(value);
        }
      } catch (e) {}
    },
    [userBalance, setAmount]
  );

  const onMoveFunds = async (type: "deposit" | "withdraw") => {
    if (!provider || !publicKey || !sendTransaction) return;

    // The program variable is an instance of the Program class.
    // It takes our program's idl and the programId as arguments.
    // Using the idl it generates a set of methods that can be called on the program.
    // The programID is the public key of the program. It is used to interact with the program on-chain.
    const program = new Program<SolanaVault>(idl as any, programID, provider);

    setIsLoading(true);

    try {
      const counterPDA = getCounterPDA(publicKey);
      const userVaultPDA = getVaultPDA(publicKey);

      // The sig variable is the transaction signature.
      // It is used to track the transaction on-chain.
      let sig: string | undefined;

      if (type === "deposit") {
        sig = await program.methods
          .deposit(new BN(amount! * LAMPORTS_PER_SOL))
          .accounts({
            userInteractionsCounter: counterPDA,
            userVaultAccount: userVaultPDA, // The userVaultPDA is the public key of the user's vault account.
            systemProgram: SystemProgram.programId, //  The systemProgram is the public key of the system program (Constant).
            signer: publicKey, // The signer is the public key of our user.
          })
          .rpc(); // The rpc method sends the transaction to the cluster and returns the transaction signature.
      }
      if (type === "withdraw") {
        sig = await program.methods
          .withdraw(new BN(amount! * LAMPORTS_PER_SOL))
          .accounts({
            userInteractionsCounter: counterPDA,
            userVaultAccount: userVaultPDA, // The userVaultPDA is the public key of the user's vault account.
            systemProgram: SystemProgram.programId, //  The systemProgram is the public key of the system program (Constant).
            signer: publicKey, // The signer is the public key of our user.
          })
          .rpc(); // The rpc method sends the transaction to the cluster and returns the transaction signature.
      }

      console.log("Transaction Signature: ", sig);
      toast.toast({
        title: "Succes!",
        description: "Your transaction was succesful",
      });

      // After the transaction is sent we update the balances of the user and the vault.
    } catch (err) {
      console.log("Transaction Error: ", err);
      toast.toast({
        title: "Error!",
        description: "Your transaction failed",
      });
    }
    setIsLoading(false);
  };

  const setBalances = async () => {
    if (!publicKey || !connected) return;

    const userVaultPDA = getVaultPDA(publicKey);

    // We use Promise.all to run both requests at the same time.
    await Promise.all([
      connection.getBalance(publicKey).then((balance) => {
        setUserBalance(balance);
      }),
      connection.getBalance(userVaultPDA).then((balance) => {
        setVaultBalance(balance);
      }),
    ]);
  };

  useEffect(() => {
    // If the user is not connected we set the balances to 0.
    if (!connected || !publicKey || !provider) {
      setUserBalance(0);
      setVaultBalance(0);
      return;
    } else {
      const counterPDA = getCounterPDA(publicKey);

      const program = new Program<SolanaVault>(idl as any, programID, provider);

      setBalances();

      program.account.userInteractions
        .subscribe(counterPDA, "processed")
        .on("change", (data: { totalDeposits: BN; totalWithdrawals: BN }) => {
          setBalances();
          setInteractionsData({
            totalDeposits: data.totalDeposits.toNumber(),
            totalWithdrawals: data.totalWithdrawals.toNumber(),
          });
        });
    }
  }, [publicKey, connected, provider]);

  return (
    <Card
      className={`w-[450px] transition-all duration-500 ${
        isLoading &&
        "animate-pulse duration-1000 pointer-events-none cursor-not-allowed grayscale"
      } `}
    >
      <CardHeader>
        <CardTitle className="flex flex-row items-center space-x-3">
          <p>Move Funds</p>
          <Badge variant="outline" className="font-light text-sm space-x-1">
            <Image src="/solana.png" alt="" width={12} height={12} />
            <p>{(userBalance / LAMPORTS_PER_SOL).toFixed(2)}</p>
          </Badge>
        </CardTitle>
        <CardDescription>
          Deposit or withdraw funds from your vault.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="p-5 space-y-4 flex flex-col items-center justify-center rounded-md border">
          <p className="text-sm font-normal text-white/80">
            Current Vault Balance
          </p>
          <p className="text-3xl font-semibold">
            {(vaultBalance / LAMPORTS_PER_SOL).toFixed(2)}
          </p>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-full p-2 text-center rounded-md border">
            <p>{interactionsData?.totalDeposits ?? 0}</p>
            <p className="text-sm text-white/50 font-light">Deposits</p>
          </div>
          <div className="w-full p-2 text-center rounded-md border">
            <p>{interactionsData?.totalWithdrawals ?? 0}</p>
            <p className="text-sm text-white/50 font-light">Withdrawls</p>
          </div>
        </div>

        <Input
          type="number"
          placeholder="Amount"
          min={0}
          onChange={correctAmount}
          value={amount}
        />
      </CardContent>

      <CardFooter className="space-x-2">
        <button
          variant="outline"
          className="w-full text-red-500 hover:bg-red-700"
          disabled={
            amount === 0 ||
            !amount ||
            isLoading ||
            !connected ||
            userBalance === 0 ||
            amount * LAMPORTS_PER_SOL > userBalance
          }
          onClick={() => onMoveFunds("deposit")}
        >
          <ArrowDown className="mr-2 h-4 w-4" /> Deposit
        </button>
        <button
          variant="outline"
          className="w-full text-green-500 hover:bg-green-700"
          disabled={
            amount === 0 ||
            !amount ||
            isLoading ||
            !connected ||
            vaultBalance === 0 ||
            amount * LAMPORTS_PER_SOL > vaultBalance
          }
          onClick={() => onMoveFunds("withdraw")}
        >
          <ArrowUp className="mr-2 h-4 w-4" /> Withdraw
        </button>
      </CardFooter>
    </Card>
  );
}

export function LeaderCard({name, pnl30, mdd30, aum}: {name: string, pnl30: number, mdd30: number, aum: number}) {
  const [showDepositCard, setShowDepositCard] = useState(false)
  return (<>
    <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
      <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
      <div className="relative">
          <div>
            <span className="text-xl text-white font-bold">{name}</span>
          </div>
          <div>
            <PnlChart />
          </div>
          <div className="mt-6 pb-6 flex justify-between gap-16">
            <div>
              <div>30 MDD</div>
              <div className="font-semibold text-white">{mdd30} %</div>
            </div>
            <div>
              <div>30 Pnl</div>
              <div className="font-semibold text-white">{pnl30}</div>
            </div>
            <div>
              <div>AUM</div>
              <div className="font-semibold text-white">{aum}</div>
            </div>
          </div>
          <div className="w-full">
            <button 
              className="px-4 py-2 w-full text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
              onClick={() => setShowDepositCard(true)}>
              Copy
            </button>
          </div>
      </div>
    </div>
    {showDepositCard && <DepositCard />}
  </>)
}

export function LeaderCardList(){
  const leaders = [
    {
      name: 'Jack',
      aum: 588800,
      mdd30: '16.8',
      pnl30: '10045'
    },
    {
      name: 'Amy',
      aum: 188800,
      mdd30: '18.8',
      pnl30: '10045'
    },
    {
      name: 'Tom',
      aum: 388800,
      mdd30: '58.8',
      pnl30: '10045'
  },
    {
      name: 'Jack',
      aum: 588800,
      mdd30: '16.8',
      pnl30: '10045'
    },
    {
      name: 'Amy',
      aum: 188800,
      mdd30: '18.8',
      pnl30: '10045'
    },
    {
      name: 'Tom',
      aum: 388800,
      mdd30: '58.8',
      pnl30: '10045'
  },
    {
      name: 'Jack',
      aum: 588800,
      mdd30: '16.8',
      pnl30: '10045'
    },
    {
      name: 'Amy',
      aum: 188800,
      mdd30: '18.8',
      pnl30: '10045'
    },
    {
      name: 'Tom',
      aum: 388800,
      mdd30: '58.8',
      pnl30: '10045'
  },
]
  return <div className="py-16">
    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
      {leaders.map(el => <LeaderCard key={el} {...el} />)}
    </div>
  </div>
}

export function PnlChart() {
  const pData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

  return (
    <ChartContainer
      width={500}
      height={300}
      series={[{ type: 'line', data: pData }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root': {
          stroke: '#8884d8',
          strokeWidth: 2,
        },
        '.MuiMarkElement-root': {
          stroke: '#8884d8',
          scale: '0.6',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
  );
}

export function PageTitle(){
  return <div className="max-w-lg px-8 pt-12">
  <h2 className="text-white-800 text-5xl font-bold">
    Leaders
  </h2>
</div>
}