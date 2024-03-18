'use client'

import  { createContext } from 'react';
import {AlertProvider} from '@/providers/alert-provider'

type AppContextType = null

export const AppContext = createContext<AppContextType>(null)

export const AppProvider = ({ children }) => {
    return (
       <AppContext.Provider value="">
            <AlertProvider>
                {children}
            </AlertProvider>
        </AppContext.Provider>
    );
};
