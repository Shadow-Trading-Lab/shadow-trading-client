'use client';

import { programId, TeamShadowIDL } from '@team-shadow/anchor';
import { Program, web3 } from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function useTeamShadowProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const wallet = useWallet();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = new Program(TeamShadowIDL, programId, provider);

  const deposit = useMutation({
    mutationKey: ['teamShadow', 'deposit', { cluster }],
    mutationFn: (keypair: Keypair, amount: number) => {
      // 算userVaultAccount 的 PDA
      const userVaultAccount = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), provider.wallet.publicKey.toBuffer()],
        program.programId
      )[0];

      // 算userVaultAccount 的 PDA
      const totalInteractionsAccount = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("counter"), provider.wallet.publicKey.toBuffer()],
        program.programId
      )[0];

    //   console.log(userVaultAccount, totalInteractionsAccount)
      
    //   program.methods.deposit().accounts({})
    },
    onSuccess: (signature) => {
      transactionToast(signature);
    },
    onError: () => toast.error('Failed to run program'),
  });

  return {
    program,
    programId,
    deposit,
  };
}
