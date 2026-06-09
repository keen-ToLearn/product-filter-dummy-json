import { createContext } from 'react';
import { type LoaderContextType } from '../type';

// Default Value of the Loader Context
const defaultLoaderContextValue: LoaderContextType = {
    toggleLoader: () => {},
};

// Exporting the Loader Context to be used in Provider file
export const LoaderContext = createContext<LoaderContextType>(defaultLoaderContextValue);