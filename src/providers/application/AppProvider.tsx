import { type PropsWithChildren } from 'react'
import { AppContext } from './AppContext'
import { useFetchCalls } from '../../hooks'

export const AppProvider = ({ children }: PropsWithChildren) => {
    const { performFetchCall } = useFetchCalls();

    return (
        <AppContext.Provider value={{ performFetchCall }}>
            {children}
        </AppContext.Provider>
    )
}