'use client'

import Image from 'next/image'
import {useState} from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { usePDA, useTeamShadowProgram } from './my-trade-data-access';
import { PublicKey } from '@solana/web3.js';
import * as Tabs from "@radix-ui/react-tabs";


export function TradeTabs() {
  const [selectedTab, setSelectedTab] = useState("Copy Trader");

  const tabItems = [
    "Copy Trader",
    "Lead Trader",
  ];

  return (
    <Tabs.Root
      className="max-w-screen-xl mt-2 mx-auto px-4 md:px-8"
      value={selectedTab}
      onValueChange={(val) => setSelectedTab(val)}
    >
      <Tabs.List
        className="hidden gap-x-3 py-1 overflow-x-auto px-px text-sm sm:flex"
        aria-label="Manage your account"
      >
        {tabItems.map((item, idx) => (
          <Tabs.Trigger
            key={idx}
            className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700 data-[state=active]:shadow-sm outline-gray-800 py-1.5 px-3 rounded-lg duration-150 text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:bg-gray-100 font-medium"
            value={item}
          >
            {item}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="relative text-gray-500 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
        <select
          value={selectedTab}
          className="py-2 px-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-gray-800 text-sm"
          onChange={(e) => setSelectedTab(e.target.value)}
        >
          {tabItems.map((item, idx) => (
            <option key={idx}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <Tabs.Content className="py-6 space-y-8" value={tabItems[0]}>
          <div className="max-w-lg">
            <h2 className="text-white-800 text-3xl font-bold">
              Copy Trade Overview
            </h2>
          </div>
          <div className='relative flex items-stretch p-8 rounded-xl border-2 border-gray-500'>
            <div className='flex flex-col flex-auto'>
              <p className='mb-3'>Wallet Balance</p>
              <p><strong className='text-white text-xl'>118.6302</strong> USDT</p>
            </div>
            <div className='flex flex-col flex-auto'>
              <p className='mb-3'>Follow Balance</p>
              <p><strong className='text-white text-xl'>560.231</strong> USDT</p>
            </div>
            <div className='flex flex-col flex-auto'>
              <p className='mb-3'>Unrealized PNL</p>
              <p><strong className='text-green-400 text-xl'>+223.82</strong> USDT</p>
            </div>
            <div className='flex flex-col flex-auto'>
              <p className='mb-3'>PNL</p>
              <p><strong className='text-green-400 text-xl'>+980.11</strong> USDT</p>
            </div>
          </div>
          <div className='relative flex-1 flex items-stretch flex-col gap-8 p-8 rounded-xl border-2 border-gray-500'>
            <div className='flex items-stretch gap-3'>
              <Image width={56} height={56} src="/pngegg.png" alt="" />
              <p className='flex items-center text-white'><strong>Jungle</strong></p>
              <div className='flex items-center ml-auto'>
                <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                    Close Position
                </button>
              </div>
            </div>
            <div className="shadow-sm rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="font-medium border-b">
                        <tr>
                            <th className="py-3 px-6">Symbol</th>
                            <th className="py-3 px-6">Entry Price</th>
                            <th className="py-3 px-6">Size</th>
                            <th className="py-3 px-6">Unrealized PNL</th>
                        </tr>
                    </thead>
                    <tbody className="text-white divide-y">
                        {
                            [
                              {symbol: 'BTC / USDT', entryPrice: 60000, currentPrice: 70000, size: 1},
                              {symbol: 'ETH / USDT', entryPrice: 3300, currentPrice: 3500, size: 10},
                              {symbol: 'BNB / USDT', entryPrice: 200, currentPrice: 300, size: 100},
                            ].map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.symbol}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.entryPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.size}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{((item.currentPrice / item.entryPrice - 1) * 100).toFixed(2)} %</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                                            Swap
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
          </div>
      </Tabs.Content>
       <Tabs.Content className="py-6" value={tabItems[1]}>
          <div className="max-w-lg">
            <h2 className="text-white-800 text-3xl font-bold">
              Lead Trade Overview
            </h2>
          </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export function CopyTradeContent({value}:{value: string}) {
  return <Tabs.Content className="py-6" value={value}>
    <div className="max-w-lg">
      <h2 className="text-white-800 text-3xl font-bold">
        Copy Trade Overview
      </h2>
    </div>
  </Tabs.Content>
}


export function LeaderTradeContent() {
  const userVaultAccount = usePDA("vault")
  const {accountInfo} = useTeamShadowProgram({account: userVaultAccount})

  if(accountInfo.isLoading) {
    return <section>
      <>Loading...</>
    </section>
  }

  return <section>
      <div>
        <h3 className='dark:text-white text-3xl font-bold'>Vault</h3>
        <p>Address: {userVaultAccount?.toBase58()} <CreateLeaderTradeVault account={userVaultAccount} /> <LeaderTradeWithdraw account={userVaultAccount} /> </p>
        <p>Balance: {accountInfo.data?.lamports? accountInfo.data?.lamports / 10 ** 9:0 } SOL</p>
      </div>
  </section>
}

export function CreateLeaderTradeVault({account}:{account: PublicKey | undefined}) {
    const [amount, setAmount] = useState(10);
    const {initialize} = useTeamShadowProgram({account})
    const handleCopyTrade = async () => {
        await initialize.mutate({name: 'Mike', amount})
    }
  
    return (
      <Dialog.Root>
        <Dialog.Trigger className="px-4 py-3 dark:text-white duration-150 active:shadow-lg">
            Deposit
        </Dialog.Trigger>
        <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <div className="rounded-md shadow-lg px-4 py-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
              <div className="flex items-center justify-end">
                {/* <Dialog.Title className="text-lg font-medium text-gray-800 dark:text-white">
                  Trader Vault
                </Dialog.Title> */}
                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Dialog.Close>
              </div>
              {/* <div> */}
              <div className="max-w-sm mx-auto space-y-3 text-center ">
                <Dialog.Title className="text-lg font-medium text-gray-800 dark:text-white ">
                  Trader Vault
                </Dialog.Title>
                <div className="relative mt-4 w-full text-gray-500">
                    <span className="h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                        &#x24;
                    </span>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(+e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-16 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <select className="text-sm bg-transparent outline-none px-1 rounded-lg h-full">
                            <option>SOL</option>
                        </select>
                    </div>
                </div>
              </div>
              <div>
                <div className='max-w-sm mx-auto mt-4'>
                  {amount>0?
                    <Dialog.Close asChild>
                      <button
                        onClick={handleCopyTrade}
                        className="w-full mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                        Deposit
                      </button>
                    </Dialog.Close>:
                    <button className="w-full mt-3 py-2.5 px-8 text-white bg-indigo-300 cursor-not-allowed rounded-lg">
                      Deposit
                    </button>
                  }
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };

export function LeaderTradeWithdraw({account}:{account: PublicKey | undefined}) {
    const [amount, setAmount] = useState(0);
    const {withdraw} = useTeamShadowProgram({account})
    const handleCopyTrade = async () => {
        await withdraw.mutate(amount)
    }
  
    return (
      <Dialog.Root>
        <Dialog.Trigger className="px-4 py-3 dark:text-white duration-150 active:shadow-lg">
          Withdraw
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-3xl mx-auto px-4">
            <div className="rounded-md shadow-lg px-4 py-6 bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-lg font-medium text-gray-800 dark:text-white">
                  Trader Vault
                </Dialog.Title>
                <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Dialog.Close>
              </div>
              <div>
                {/* <label className="text-gray-600 dark:text-white">
                    Copy Amount
                </label> */}
                <div className="relative mt-2 max-w-xs text-gray-500">
                    <span className="h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                        &#x24;
                    </span>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(+e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-16 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <select className="text-sm bg-transparent outline-none px-1 rounded-lg h-full">
                            <option>SOL</option>
                        </select>
                    </div>
                </div>
              </div>
              <div>
                <div className='mt-4'>
                  {amount>0?
                    <Dialog.Close asChild>
                      <button
                        onClick={handleCopyTrade}
                        className="text-sm mt-3 py-2.5 px-8 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                        Withdraw
                      </button>
                    </Dialog.Close>:
                    <button className="px-7 py-3.5 text-white bg-indigo-300 cursor-not-allowed rounded-lg">
                      Withdraw
                    </button>
                  }
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  };
