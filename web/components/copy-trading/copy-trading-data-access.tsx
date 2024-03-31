'use client';

import { programId, TeamShadowIDL } from '@team-shadow/anchor';
import { Program } from '@coral-xyz/anchor';
import { useQuery } from "@tanstack/react-query";
import { useAnchorProvider } from '../solana/solana-provider';

export function useLeaderAccounts() {
    const provider = useAnchorProvider();
    const program = new Program(TeamShadowIDL, programId, provider);

    return useQuery({
      queryKey: ['test-count', 'all'],
      queryFn: () => program.account.userInteractions.all(),
    });
}

