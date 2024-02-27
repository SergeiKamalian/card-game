import { ReactNode, createContext, useContext } from 'react';
import { APP_LOADING_CONTEXT_DEFAULT_VALUES } from '../defaultValues';
import { useAppLoading } from '../../hooks/useAppLoading';

const AppLoadingContext = createContext(APP_LOADING_CONTEXT_DEFAULT_VALUES);

export const useAppLoadingContext = () => {
    const context = useContext(AppLoadingContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

export const AppLoadingProvider = ({ children }: { children: ReactNode }) => {
    const appMethods = useAppLoading();

    return (
        <AppLoadingContext.Provider value={appMethods}>
            {children}
        </AppLoadingContext.Provider>
    );
};
