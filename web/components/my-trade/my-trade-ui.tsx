'use client'

import Image from 'next/image'
import {useState} from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { usePDA, useTeamShadowProgram } from './my-trade-data-access';
import { PublicKey } from '@solana/web3.js';
import * as Tabs from "@radix-ui/react-tabs";
import { ChartContainer } from '@mui/x-charts';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';


export function TradeTabs() {
  const [selectedTab, setSelectedTab] = useState("Copy Trader");

  const tabItems = [
    "Copy Trader",
    "My Lead",
  ];

  const subTabItems = [
    "Positions",
    "Position history",
    "Copy Traders",
    "Transfer History",
  ];

  return (
    <Tabs.Root
      className="max-w-screen-xl mx-auto px-4 md:px-8"
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
                            <th className="py-3 px-6">Coin</th>
                            <th className="py-3 px-6">Entry Price</th>
                            <th className="py-3 px-6">Size</th>
                            <th className="py-3 px-6">Unrealized PNL</th>
                        </tr>
                    </thead>
                    <tbody className="text-white divide-y">
                        {
                            [
                              {coin: 'BTC', entryPrice: 60000, currentPrice: 70000, amount: 1},
                              {coin: 'ETH', entryPrice: 3300, currentPrice: 3500, amount: 10},
                              {coin: 'BNB', entryPrice: 200, currentPrice: 300, amount: 100},
                            ].map((item, idx) => (
                                <tr key={idx}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.coin}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.entryPrice}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{((item.currentPrice / item.entryPrice - 1) * 100).toFixed(2)} %</td>
                                    <td className="text-right px-6 whitespace-nowrap">
                                        <a href="javascript:void()" className="py-2 px-3 font-medium text-red-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
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
       <Tabs.Content className="py-6 space-y-8" value={tabItems[1]}>
          <div className="max-w-lg">
            <h2 className="text-white-800 text-3xl font-bold">
              Lead Trade Overview
            </h2>
          </div>
          <div className='flex items-stretch gap-3'>
              <Image width={56} height={56} src="/pngegg.png" alt="" />
              <p className='flex items-center text-white'><strong>Elmer</strong></p>
              <div className='flex items-center ml-auto'>
                <button className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                    Close
                </button>
              </div>
            </div>
          <div className='space-y-6 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
              <div className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2 border-gray-500'>
                  <div>
                      <span className='text-white text-xl font-bold'>
                          My Lead Overview
                      </span>
                  </div>
                  <ul className='py-8 space-y-3'>
                      <li className='flex justify-between'>
                          <span>Copier PnL</span>
                          <span className='text-green-500'>+102.43 USDT</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Unrealized Profit Sharing</span>
                          <span className='text-green-500'>+10.2091</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Profit Sharing</span>
                          <span className='text-white'>10.00 %</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Leading Margin Balance</span>
                          <span className='text-white'>1,322.95 USDT</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Minimum Copy Amount</span>
                          <span className='text-white'>10/10 USDT</span>
                      </li>
                  </ul>
              </div>
              <div className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2 border-gray-500'>
                  <div className='flex justify-between text-white'>
                      <span className='text-xl font-bold'>
                          Performance
                      </span>
                      <span>7 Days</span>
                  </div>
                  <ul className='py-8 space-y-3'>
                      <li className='flex justify-between'>
                          <span>ROI</span>
                          <span className='text-green-500'>+21.53%</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Sharpe Ratio</span>
                          <span className='text-green-500'>2.22</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>MDD</span>
                          <span className='text-white'>22.71%</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Win Rate</span>
                          <span className='text-white'>10.0%</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Win Positions</span>
                          <span className='text-white'>6</span>
                      </li>
                      <li className='flex justify-between'>
                          <span>Total Positions</span>
                          <span className='text-white'>10</span>
                      </li>
                  </ul>
              </div>
              <div className='relative flex-1 flex items-stretch flex-col p-8 rounded-xl border-2 border-gray-500'>
                  <div className='flex justify-between text-white'>
                      <span className='text-xl font-bold'>
                          PnL
                      </span>
                      <span>7 Days</span>
                  </div>
                  <PnlChart />
              </div>
          </div>
          <div className='p-8 rounded-xl border-2 border-gray-500'>
              <LeadTradeTabs />
          </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export function LeadTradeTabs() {
  const subTabItems = [
    "Positions",
    "Position history",
    "Transfer History",
    "Copy Traders",
  ];

  return <Tabs.Root
    className="max-w-screen-xl mx-auto"
    defaultValue="Positions"
  >
    <Tabs.List
      className="w-full flex items-center gap-x-3 overflow-x-auto text-lg"
      aria-label="Manage your account"
    >
      {subTabItems.map((item, idx) => (
        <Tabs.Trigger
          key={idx}
          className="group outline-none py-1.5 text-gray-500 data-[state=active]:border-white data-[state=active]:text-white"
          value={item}
        >
          <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-gray-500 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
            {item}
          </div>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    <Tabs.Content className="py-6" value={subTabItems[0]}>
      <div className="shadow-sm rounded-lg overflow-x-auto px-8">
          <table className="w-full table-auto text-sm text-left">
              <thead className="font-medium border-b">
                  <tr>
                      <th className="py-3 px-6">Symbol</th>
                      <th className="py-3 px-6">Size</th>
                      <th className="py-3 px-6">Entry Price</th>
                      <th className="py-3 px-6">Margin</th>
                      <th className="py-3 px-6">Unrealized PNL</th>
                      <th className="py-3 px-6">ROI</th>
                  </tr>
              </thead>
              <tbody className="text-white divide-y">
                  {
                      [
                        {symbol: 'DOGEUSDT', entryPrice: 0.16122, currentPrice: 0.17992, size: 305, margin: 67.23},
                        {symbol: 'SHIBUSDT', entryPrice: 0.00000289, currentPrice: 0.00000674, size: 26489, margin: 184.62},
                      ].map((item, idx) => (
                          <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap">{item.symbol}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.size}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.entryPrice}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.margin} USDT</td>
                              <td className="px-6 py-4 whitespace-nowrap">{((item.currentPrice / item.entryPrice - 1) * item.size).toFixed(2)}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{((item.currentPrice / item.entryPrice - 1) * 100).toFixed(2)} %</td>
                              <td className="text-right px-6 whitespace-nowrap">
                                  <a className="py-2 px-3 font-medium text-red-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg cursor-pointer">
                                      Swap
                                  </a>
                              </td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>
    </Tabs.Content>
    <Tabs.Content className="py-6" value={subTabItems[1]}>
      <div>
         <div className='px-8 py-4 hover:bg-gray-700'>
            <div className='flex justify-between mb-1'>
              <div>
                <span className='text-white'>ETCUSDT Perpetual </span>
                <span className='text-gray-400'> Isolated </span>
                <span className='text-green-500'> Long</span>
              </div>
              <div>
                <span className='text-gray-400'> Closed</span>
              </div>
            </div>
            <div className='flex justify-between'>
              <div>
                <div>
                  <span className='text-gray-400'>Opened</span>
                  <span className='text-white'> 2024-02-23 02:34:45 </span>
                </div>
                <div>
                  <span className='text-gray-400'>Closed</span>
                  <span className='text-white'> 2024-02-26 23:07:26 </span>
                </div>
              </div>
              <div>
                <div>
                  <span className='text-gray-400'>Entry Price</span>
                  <span className='text-white'> 25.989 USDT </span>
                </div>
                <div>
                  <span className='text-gray-400'>Avg. Close</span>
                  <span className='text-white'> Price27.286 USDT </span>
                </div>
              </div>
              <div>
                <div>
                  <span className='text-gray-400'>Max. Open Interest</span>
                  <span className='text-white'> 3.84 ETC </span>
                </div>
                <div>
                  <span className='text-gray-400'>Closed Vol.</span>
                  <span className='text-white'>3.84 ETC </span>
                </div>
              </div>
              <div>
                <div>
                  <span className='text-gray-400'>Closing PNL</span>
                </div>
                <div>
                  <span className='text-green-500'>+4.98 USDT</span>
                </div>
              </div>
            </div>
            
          </div>
          <div className='px-8 py-4 hover:bg-gray-700'>
          <div className='flex justify-between mb-1'>
              <div>
                <span className='text-white'>UNIUSDT Perpetual </span>
                <span className='text-gray-400'> Isolated </span>
                <span className='text-green-500'> Long</span>
              </div>
              <div>
                <span className='text-gray-400'> Closed</span>
              </div>
            </div>
              <div className='flex justify-between'>
                <div>
                  <div>
                    <span className='text-gray-400'>Opened</span>
                    <span className='text-white'> 2024-02-23 02:32:59 </span>
                  </div>
                  <div>
                    <span className='text-gray-400'>Closed</span>
                    <span className='text-white'> 2024-02-26 23:09:31 </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className='text-gray-400'>Entry Price</span>
                    <span className='text-white'> 7.4230 USDT </span>
                  </div>
                  <div>
                    <span className='text-gray-400'>Avg. Close Price</span>
                    <span className='text-white'> 10.8260 USDT </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className='text-gray-400'>Max. Open Interest</span>
                    <span className='text-white'> 13 UNI </span>
                  </div>
                  <div>
                    <span className='text-gray-400'>Closed Vol.</span>
                    <span className='text-white'> 13 UNI </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span className='text-gray-400'>Closing PNL</span>
                  </div>
                  <div>
                    <span className='text-green-500'>+44.24 USDT</span>
                  </div>
                </div>
              </div>
            </div>
      </div>
    </Tabs.Content>
    <Tabs.Content className="py-6" value={subTabItems[3]}>
        <div className="shadow-sm rounded-lg overflow-x-auto px-8">
          <table className="w-full table-auto text-sm text-left">
              <thead className="font-medium border-b">
                  <tr>
                      <th className="py-3 px-6">User ID</th>
                      <th className="py-3 px-6">Copy Margin Balance</th>
                      <th className="py-3 px-6">Total PNL</th>
                      <th className="py-3 px-6">Total ROI</th>
                      <th className="py-3 px-6">Duration</th>
                  </tr>
              </thead>
              <tbody className="text-white divide-y">
                  {
                      [
                        {userId: 'Ano**************eba', copyMarginBalance: '1,805.52 USDT', totalPNL: '194.48 USDT', totalROI: '9.73%', duration: '31 Days'},
                      ].map((item, idx) => (
                          <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap">{item.userId}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.copyMarginBalance}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.totalPNL}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.totalROI}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.duration}</td>
                          </tr>
                      ))
                  }
              </tbody>
          </table>
      </div>
    </Tabs.Content>
  </Tabs.Root>
}


export function PnlChart() {
  const pData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

  return (
    <ChartContainer
      width={300}
      height={300}
      series={[{ type: 'line', data: pData }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        '.MuiLineElement-root': {
          stroke: '#8884d8',
          strokeWidth: 2,
        },
        '.MuiMarkElement-root': {
          stroke: '#8884d8',
          scale: '0.6',
          fill: '#fff',
          strokeWidth: 2,
        },
      }}
      disableAxisListener
    >
      <LinePlot />
      <MarkPlot />
    </ChartContainer>
  );
}

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
