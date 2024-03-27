'use client'

import {useState} from 'react'
import * as Dialog from "@radix-ui/react-dialog";
import { useAccountInfo, usePDA, useTeamShadowProgram } from './my-trade-data-access';


export function PageTitle() {
    return <h2 className='dark:text-white text-4xl font-bold'>Overview</h2>
}

export function LeaderTradeContent() {
  const userVaultAccount = usePDA("vault")
  const {data, isLoading} = useAccountInfo(userVaultAccount)

  return <section>
    {isLoading? 
      <>Loading...</>: 
      <div>
        <h3 className='dark:text-white text-3xl font-bold'>Vault</h3>
        <p>Address: {userVaultAccount?.toBase58()} <CreateLeaderTradeVault /> <LeaderTradeWithdraw /> </p>
        <p>Balance: {data?.lamports? data?.lamports / 10 ** 9:0 } SOL</p>
      </div>
    }
  </section>
}

export function CreateLeaderTradeVault() {
    const [amount, setAmount] = useState(0);
    const {deposit} = useTeamShadowProgram()
    const handleCopyTrade = async () => {
        await deposit.mutate(amount)
    }
  
    return (
      <Dialog.Root>
        <Dialog.Trigger className="px-4 py-3 dark:text-white duration-150 active:shadow-lg">
            Deposit
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
                        Deposit
                      </button>
                    </Dialog.Close>:
                    <button className="px-7 py-3.5 text-white bg-indigo-300 cursor-not-allowed rounded-lg">
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

export function LeaderTradeWithdraw() {
    const [amount, setAmount] = useState(0);
    const {withdraw} = useTeamShadowProgram()
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
