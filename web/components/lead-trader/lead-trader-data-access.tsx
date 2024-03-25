'use client';

import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { programId } from "@team-shadow/anchor";

export function useLeaderAccounts() {
    const { connection } = useConnection();
  
    return useQuery({
        queryKey: ['teamShadow', 'leader-accounts', 'cluster'],
        queryFn: async () => {
            
            const info = await connection.getAccountInfo(programId)
            // console.log(info)
          }
      })
  }