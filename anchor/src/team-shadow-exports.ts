// Here we export some useful types and functions for interacting with the Anchor program.
import { PublicKey } from '@solana/web3.js';
import type { TeamShadow } from '../target/types/team_shadow';
import { IDL as TeamShadowIDL } from '../target/types/team_shadow';

// Re-export the generated IDL and type
export { TeamShadow, TeamShadowIDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const programId = new PublicKey(
  'CG7Dq53EJdheZ4PKRe18CmXxsAdpxAGWCYK6hL7fem3b'
);
