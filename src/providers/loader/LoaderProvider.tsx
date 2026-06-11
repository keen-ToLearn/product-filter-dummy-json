import { useState, type PropsWithChildren } from 'react'
import { LoaderContext } from './LoaderContext'
import { Loader } from '../../pages';

export const LoaderProvider = ({ children }: PropsWithChildren) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoader = () => setIsLoading(loading => !loading);

    return (
        <LoaderContext.Provider value={{ toggleLoader }}>
            {isLoading && <Loader />}
            {children}
        </LoaderContext.Provider>
    )
}