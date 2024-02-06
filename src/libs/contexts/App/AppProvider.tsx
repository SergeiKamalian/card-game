import { FC } from 'react';

import AppContext from './AppContext';
import { useAppInitialization } from '../../hooks';

interface AppContextProps {
    children: React.ReactNode;
}

export const AppProvider: FC<AppContextProps> = ({ children }) => {
    const app = useAppInitialization();

    return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};
