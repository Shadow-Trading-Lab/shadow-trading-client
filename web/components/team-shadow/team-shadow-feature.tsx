'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useTeamShadowProgram } from './team-shadow-data-access';
import { TeamShadowCreate, TeamShadowProgram } from './team-shadow-ui';

export default function TeamShadowFeature() {
  const { publicKey } = useWallet();
  const { programId } = useTeamShadowProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="TeamShadow"
        subtitle={'Run the program by clicking the "Run program" button.'}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <TeamShadowCreate />
      </AppHero>
      <TeamShadowProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
