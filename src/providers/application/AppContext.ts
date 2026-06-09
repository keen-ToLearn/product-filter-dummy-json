import { createContext } from 'react';
import { type AppContextType } from '../type';

// Default Value of the App Context
const defaultAppContextValue: AppContextType = {
    performFetchCall: () => Promise.resolve(),
};

// Exporting the App Context to be used in Provider file
export const AppContext = createContext<AppContextType>(defaultAppContextValue);