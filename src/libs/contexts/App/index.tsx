import { ReactNode, createContext, useContext } from 'react';
import { useAppInitialization } from '../../hooks';
import { APP_CONTEXT_DEFAULT_VALUES } from '../defaultValues';

const AppContext = createContext(APP_CONTEXT_DEFAULT_VALUES);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const appMethods = useAppInitialization();

    return (
        <AppContext.Provider value={appMethods}>
            {children}
        </AppContext.Provider>
    );
};
