use anchor_lang::prelude::*;

declare_id!("EkyqFDzVC7xSzXaFtZvBck1ALLta9qyHxcVcjXPnSmHp");

#[program]
pub mod team_shadow {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
