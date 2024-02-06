import { createContext } from 'react';
import { useAppInitialization } from '../../hooks';

type InitialValues = ReturnType<typeof useAppInitialization>;

const AppContext = createContext<InitialValues>({} as InitialValues);

export default AppContext;
