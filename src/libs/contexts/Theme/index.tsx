import { ReactNode, memo } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../constants';

interface ThemeProps {
    children: ReactNode;
}

export const Theme = memo(({ children }: ThemeProps) => {

    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
});

Theme.displayName = 'Theme';