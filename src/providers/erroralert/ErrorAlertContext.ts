import { createContext } from 'react';
import { type ErrorAlertContextType } from '../type';

// Default Value of the Error Alert Context
const defaultAlertContextValue: ErrorAlertContextType = {
    showErrorMessage: () => {},
};

// Exporting the Error Alert Context to be used in Provider file
export const ErrorAlertContext = createContext<ErrorAlertContextType>(defaultAlertContextValue);