import  { useState, createContext } from 'react';

type AlertContextType = null

export const AlertContext = createContext<AlertContextType>(null)


export const AlertProvider = ({ children }: {children: any}) => {
    return (
       <AlertContext.Provider value={null}>
            {children}
        </AlertContext.Provider>
    );
};
