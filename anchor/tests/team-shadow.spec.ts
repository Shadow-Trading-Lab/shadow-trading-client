import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { TeamShadow } from '../target/types/team_shadow';
import { Keypair } from '@solana/web3.js';

describe('team-shadow', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const program = anchor.workspace.TeamShadow as Program<TeamShadow>;

  it('should run the program', async () => {
    // Add your test here.
    const tx = await program.methods.greet().rpc();
    console.log('Your transaction signature', tx);
  });

  it("Say hello!", async () => {
    // Just run Anchor's IDL method to build a transaction!
    //
    const msg = await program.methods.hello().accounts({}).rpc();
    console.log(msg)
  });

  it("Create account", async() => {
    const newKeypair = new Keypair()
    await program.methods
      .createSystemAccount()
      .accounts({
        payer: provider.wallet.publicKey,
        newAccount: newKeypair.publicKey
      })
      .signers([newKeypair])
      .rpc()
  })
});
