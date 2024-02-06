import { createContext } from 'react';
import { useUser } from '../../hooks';

type InitialValues = ReturnType<typeof useUser>;

const UserContext = createContext<InitialValues>({} as InitialValues);

export default UserContext;
