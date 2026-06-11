import { useState, type PropsWithChildren } from 'react';
import { ErrorAlertContext } from './ErrorAlertContext';
import { ErrorAlert } from '../../pages';

export const ErrorAlertProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState<string>('');

    const showErrorMessage = (message: string) => setMessage(message);

    return (
        <ErrorAlertContext.Provider value={{
            showErrorMessage,
        }}>
            {message.length > 0 && (
                <ErrorAlert
                    message={message}
                    showErrorMessage={showErrorMessage}
                />
            )}
            {children}
        </ErrorAlertContext.Provider>
    )
}