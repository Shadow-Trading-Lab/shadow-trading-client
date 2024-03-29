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

export function useTeamShadowProgram({
    account,
  }: {
    account: PublicKey | undefined;
  }) {
    const {connection} = useConnection()
    const { cluster } = useCluster();
    const wallet = useWallet();
    const transactionToast = useTransactionToast();
    const provider = useAnchorProvider();
    const program = new Program(TeamShadowIDL, programId, provider);
    const totalInteractionsAccount = usePDA("counter")

    const accountInfo = useQuery({
        queryKey: ['account-info', 'accountInfo', { cluster }],
        queryFn: () => account? connection.getAccountInfo(account):null,
    })

    const deposit = useMutation({
        mutationKey: ['teamShadow', 'deposit', { cluster }],
        mutationFn: async (amount: number) => {
            const tx = await program.methods
                .deposit(new BN(amount * 10 ** 9))
                .accounts({
                    userVaultAccount: account,
                    userInteractionsCounter: totalInteractionsAccount,
                    signer: wallet.publicKey?.toBase58(),
                    systemProgram: web3.SystemProgram.programId
                })
                .rpc()

            console.log(tx)
            return tx
        },
        onSuccess: (signature: string) => {
            transactionToast(signature);
            accountInfo.refetch();
        },
        onError: (msg) => {
            console.error(msg)
            toast.error('Failed to run program')
        },
    });

    const withdraw = useMutation({
        mutationKey: ['teamShadow', 'withdraw', { cluster }],
        mutationFn: async (amount: number) => {
            const tx = await program.methods
                .withdraw(new BN(amount * 10 ** 9))
                .accounts({
                    userVaultAccount: account   ,
                    userInteractionsCounter: totalInteractionsAccount,
                    signer: wallet.publicKey?.toBase58(),
                    systemProgram: web3.SystemProgram.programId
                })
                .rpc()

            console.log(tx)
            return tx
        },
        onSuccess: (signature: string) => {
            transactionToast(signature);
            accountInfo.refetch();
        },
        onError: (msg) => {
            console.error(msg)
            toast.error('Failed to withdraw')
        },
    })

    return {
        program,
        programId,
        accountInfo,
        deposit,
        withdraw
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
