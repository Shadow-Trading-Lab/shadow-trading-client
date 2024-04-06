'use client'

import * as React from 'react';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import STLLogo from '@/public/STL-logo.png'
import USDCLogo from '@/public/usdc-logo.png'
import SwapArrow from '@/public/swap-arrow.png'
import './swap-stl.css'

export function CoinField({value, onChange, symbol}: {activeField: boolean, value: number, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, symbol: string}) {
  return (
    <div className='min-h-[80px] border-solid border-2 rounded text-right m-0'>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className='h-[5rem]'
      >

        {/* Text Field */}
        <Grid item xs={6}>
          <InputBase
            type='number'
            value={value}
            onChange={(e) => onChange(e)}
            placeholder="0"
            className='w-full h-full text-white text-xl'
            // classes={{ root: classes.input, input: classes.inputBase }}
          />
        </Grid>
        {/* Button */}
        <Grid item xs={3} className='flex items-center'>
          <Image src={symbol==='USDC'?USDCLogo:STLLogo} alt="Coin Logo" width={50} />
          <span className='mx-3'>{symbol}</span>
        </Grid>
      </Grid>
    </div>
  )
}

export function Uniswap({setAction, setShowModal, price}: {setAction: (action: string) => void, setShowModal: (show: boolean) => void, price: number}) {
  const [coins, setCoins] = React.useState(['USDC','STL'])
  const [amount,setAmount] = React.useState(0)

  const switchFields = () => {
    const temp = [coins[1],coins[0]]
    setCoins(temp)
  }
  return(<Container className='w-[28rem] bg-slate-800'>
        <Paper className='rounded p-2 bg-slate-800 text-white text-lg'>
      <Typography variant="h5" className='text-center p-2 mb-2'>
        Swap Coins
      </Typography>

      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12} className='w-full'>
          <CoinField
            activeField={true}
            value={amount}
            symbol={coins[0]}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </Grid>

        <IconButton onClick={switchFields} className='z-10 p-1 mt-4'>
          <Image src={SwapArrow} alt="Swap Icon" width={50} />
        </IconButton>

        <Grid item xs={12} className='w-full'>
          <CoinField
            activeField={false}
            value={coins[0]==='USDC'?amount/price:amount*price}
            symbol={coins[1]}
            onChange={()=>null}
          />
        </Grid>
      </Grid>
        <button className='btn btn-primary bg-yellow-200 text-xl w-full my-4' 
          onClick={()=>{setShowModal(true)}}>Swap
        </button>
    </Paper>
  </Container>
  )
}

export function AlertSuccess({msg, setShowModal}: {msg: string, setShowModal: (show: boolean) => void}) {
    return (
        <div className="fixed mt-12 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8 z-50 bottom-12 right-12">
            <div className="flex justify-between py-3">
                <div className="flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="self-center ml-3">
                        <span className="text-green-600 font-semibold">
                            Success
                        </span>
                        <p className="text-green-600 mt-1">
                            {msg}
                        </p>
                    </div>
                </div>
                <button className="self-start text-green-500" onClick={()=>setShowModal(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
  }
  