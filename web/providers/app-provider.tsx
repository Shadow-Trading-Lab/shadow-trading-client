'use client'

import  { createContext } from 'react';
import {AlertProvider} from '@/providers/alert-provider'

type AppContextType = null

export const AppContext = createContext<AppContextType>(null)

export const AppProvider = ({ children }: {children: any}) => {
    return (
       <AppContext.Provider value={null}>
            <AlertProvider>
                {children}
            </AlertProvider>
        </AppContext.Provider>
    );
};
