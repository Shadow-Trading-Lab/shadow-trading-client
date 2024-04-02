'use client';

import { programId, TeamShadowIDL } from '@team-shadow/anchor';
import { Program, web3, BN } from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import { useMemo } from 'react';

export function useTeamShadowProgram() {
  const { cluster } = useCluster();
  const wallet = useWallet();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = new Program(TeamShadowIDL, programId, provider);
  const userInteractionsCounter = usePDA("counter")
  const userVaultAccount = usePDA("vault")

  const accounts = useQuery({
    queryKey: ['team-shadow', 'all', { cluster }],
    queryFn: () => program.account.userInteractions.all(),
  });

  const initialize = useMutation({
      mutationKey: ['team-shadow', 'initialize', { cluster }],
      mutationFn: async ({name, amount}:{name: string, amount: number}) => {
          const tx = await program.methods
              .initialize(name, new BN(amount * 10 ** 9))
              .accounts({
                  userVaultAccount,
                  userInteractionsCounter,
                  signer: wallet.publicKey?.toBase58(),
                  systemProgram: web3.SystemProgram.programId
              })
              .rpc()

          console.log(tx)
          return tx
      },
      onSuccess: (signature: string) => {
          transactionToast(signature);
          accounts.refetch()
      },
      onError: (msg) => {
          console.error(msg)
          toast.error('Failed to run program')
      },
  });

  return {
      program,
      programId,
      accounts,
      initialize,
  };
}

export function usePDA(data: string){
  const provider = useAnchorProvider();
  const program = new Program(TeamShadowIDL, programId, provider);
  const pda = useMemo(() => {
      if(!provider.wallet.publicKey) return undefined
      return web3.PublicKey.findProgramAddressSync(
          [Buffer.from(data), provider.wallet.publicKey.toBuffer()],
          program.programId
      )[0];
  }, [provider])

  return pda
}


export function useTeamShadowProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program } = useTeamShadowProgram();

  const accountQuery = useQuery({
    queryKey: ['team-shadow', 'fetch', { cluster, account }],
    queryFn: () => program.account.userInteractions.fetch(account),
  });


  return {
    accountQuery,
  };
}
