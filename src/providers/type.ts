import { type DoFetchCallFuncType } from '../hooks';

export interface AppContextType {
    performFetchCall: DoFetchCallFuncType;
}

export interface ProductContextType {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

export interface LoaderContextType {
    toggleLoader: () => void;
}
