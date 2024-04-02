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


export function useLeaderAccounts() {
    const provider = useAnchorProvider();
    const program = new Program(TeamShadowIDL, programId, provider);

    return useQuery({
      queryKey: ['test-count', 'all'],
      queryFn: () => program.account.userInteractions.all(),
    });
}


export function useTeamShadowProgram() {
  const {connection} = useConnection()
  const { cluster } = useCluster();
  const wallet = useWallet();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = new Program(TeamShadowIDL, programId, provider);
  const userInteractionsCounter = usePDA("counter")
  const userVaultAccount = usePDA("vault")

  const initialize = useMutation({
      mutationKey: ['teamShadow', 'initialize', { cluster }],
      mutationFn: async ({name, amount}:{name: string, amount: number}) => {
          console.log(name, amount)
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
      },
      onError: (msg) => {
          console.error(msg)
          toast.error('Failed to run program')
      },
  });

  return {
      program,
      programId,
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