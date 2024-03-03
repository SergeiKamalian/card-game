import { DefaultTheme } from 'styled-components'

const colors = {
    primary: '#22242f',
    secondary: '#12141e',
    tertiary: '#171922',
    formBg: '#12141b',
    white: '#e8eefc',
    error: '#d32f2f',
    link: '#2B74D9',
    purple1: '#4229a0',
    purple2: '#453a95',
    purple3: '#741788',
    purpleLight: '#919ab7',
    success: '#198754',
    warning: '#FF5F15'
}
const shadows = {
    primary: '2px 13px 75px -14px rgba(0,0,0,1)',
    secondary: '#12141e',
    tertiary: '#171922'
}
const gradients = {
    form: 'linear-gradient(16deg, rgba(28,30,41,1) 0%, rgba(41,45,58,1) 100%);',
    primaryButton: 'linear-gradient(16deg,rgba(40, 44, 59, 1) 0%,rgba(34, 39, 53, 1) 100%)',
    secondaryButton: 'linear-gradient(16deg, rgba(66,41,160,1) 0%, rgba(116,23,136,1) 100%)',
    tertiary: '#171922'
}

export const theme: DefaultTheme = {
    colors,
    shadows,
    gradients
}