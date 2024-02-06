import { FC } from 'react';

import UserContext from './UserContext';
import { useUser } from '../../hooks';

interface UserContextProps {
    children: React.ReactNode;
}

export const UserProvider: FC<UserContextProps> = ({ children }) => {
    const user = useUser();

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
