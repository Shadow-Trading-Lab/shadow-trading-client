use anchor_lang::{
    prelude::*,
    system_program::transfer,
    system_program::Transfer
};
// use anchor_lang::system_program;
use anchor_lang::solana_program;

declare_id!("CG7Dq53EJdheZ4PKRe18CmXxsAdpxAGWCYK6hL7fem3b");

#[program]
pub mod team_shadow {
    use super::*;

    // pub fn initialize(ctx: Context<Initialize>,  name: String, amount: u64) -> Result<()> {
    pub fn initialize(ctx: Context<Initialize>, name: String, amount: u64) -> Result<()> {
        transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.user_vault_account.to_account_info(),
                },
            ),
            amount,
        )?;

        ctx.accounts.user_interactions_counter.name = name;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.signer.to_account_info(),
                    to: ctx.accounts.user_vault_account.to_account_info(),
                },
            ),
            amount,
        )?;

        ctx.accounts.user_interactions_counter.total_deposits += 1;

        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        // let bump = *ctx.bumps.get("user_vault_account").unwrap();
        // let bump = WithdrawBumps::min("user_vault_account").unwrap();

        let seeds = &["user_vault_account".as_bytes(), &[ctx.bumps.user_vault_account]];
        let signer = [&seeds[..]];

        let ix = solana_program::system_instruction::transfer(
            &ctx.accounts.user_vault_account.key(),
            &ctx.accounts.signer.key(),
            amount,
        );
        solana_program::program::invoke_signed(
            &ix,
            &[
                ctx.accounts.user_vault_account.to_account_info(),
                ctx.accounts.signer.to_account_info(),
            ],
            &signer
            // &[&[b"vault", ctx.accounts.signer.key().as_ref(), &[bump]]],
        )?;

        ctx.accounts.user_interactions_counter.total_withdrawals += 1;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    /// CHECK: `user_vault_account` is safe because it is created and initialized
    /// by the signer, ensuring it has the correct ownership and permissions.
    #[account(
        mut,
        seeds=[b"vault", signer.key().as_ref()],
        bump
    )]
    pub user_vault_account: AccountInfo<'info>,
    #[account(
        init_if_needed,
        space = UserInteractions::MAX_SIZE,
        seeds=[b"counter", signer.key().as_ref()],
        bump,
        payer = signer
    )]
    pub user_interactions_counter: Account<'info, UserInteractions>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    /// CHECK: `user_vault_account` is safe because it is created and initialized
    /// by the signer, ensuring it has the correct ownership and permissions.
    #[account(mut, seeds=[b"vault", signer.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(seeds=[b"counter", signer.key().as_ref()], bump)]
    pub user_interactions_counter: Account<'info, UserInteractions>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    /// CHECK: `user_vault_account` is safe because it is created and initialized
    /// by the signer, ensuring it has the correct ownership and permissions.
    #[account(mut, seeds=[b"vault", signer.key().as_ref()], bump)]
    pub user_vault_account: AccountInfo<'info>,
    #[account(mut, seeds=[b"counter", signer.key().as_ref()], bump)]
    pub user_interactions_counter: Account<'info, UserInteractions>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserInteractions {
    name: String,
    total_deposits: u64,
    total_withdrawals: u64,
}

impl UserInteractions {
    const MAX_SIZE: usize = 
        8 + // discriminator
        (4 + 20) + // 20 chars of name
        8 + // total_deposits
        8; // total_withdrawals
}