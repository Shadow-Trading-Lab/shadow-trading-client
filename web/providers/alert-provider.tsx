import  { useState, createContext } from 'react';

type AlertContextType = null

export const AlertContext = createContext<AlertContextType>(null)


export const AlertProvider = ({ children }) => {
    return (
       <AlertContext.Provider value={{}}>
            {children}
        </AlertContext.Provider>
    );
};
