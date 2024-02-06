import { ReactNode, createContext, useContext } from 'react';
import { useUser } from '../../hooks';
import { USER_CONTEXT_DEFAULT_VALUES } from '../defaultValues';

const UserContext = createContext(USER_CONTEXT_DEFAULT_VALUES);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const userMethods = useUser();

    return (
        <UserContext.Provider value={userMethods}>
            {children}
        </UserContext.Provider>
    );
};
