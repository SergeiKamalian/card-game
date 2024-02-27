import { DefaultTheme } from 'styled-components'

const colors = {
    primary: '#22242f',
    secondary: '#12141e',
    tertiary: '#171922',
    formBg: '#12141b',
    white: '#e8eefc',
    error: '#d32f2f',
    link: '#2B74D9'
}
const shadows = {
    primary: '2px 13px 75px -14px rgba(0,0,0,1)',
    secondary: '#12141e',
    tertiary: '#171922'
}
const gradients = {
    form: 'linear-gradient(16deg, rgba(28,30,41,1) 0%, rgba(41,45,58,1) 100%);',
    secondary: '#12141e',
    tertiary: '#171922'
}

export const theme: DefaultTheme = {
    colors,
    shadows,
    gradients
}