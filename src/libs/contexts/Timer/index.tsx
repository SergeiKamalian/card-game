import { ReactNode, createContext, useContext } from 'react';
import { useTimer } from '../../hooks';
import { TIMER_CONTEXT_DEFAULT_VALUES } from '../defaultValues';

const TimerContext = createContext(TIMER_CONTEXT_DEFAULT_VALUES);

export const useTimerContext = () => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export const TimerProvider = ({ children }: { children: ReactNode }) => {
    const timerMethods = useTimer();

    return (
        <TimerContext.Provider value={timerMethods}>
            {children}
        </TimerContext.Provider>
    );
};
