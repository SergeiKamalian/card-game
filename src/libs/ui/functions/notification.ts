import { toast } from 'react-toastify'

export const notification = (text: string, type: 'success' | 'error' | 'info', during?: number) => {
    return toast(text, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        autoClose: during ?? 3000,
        type,
    })
}