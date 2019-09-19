import { toast } from 'react-toastify';

export const infoToast = (toastId: string, text: string) => toast.info(text, { 
    autoClose: false, 
    toastId 
});

export const successToast = (toastId: string, text: string) => toast.update(toastId, { 
    render: text, 
    type: toast.TYPE.SUCCESS, 
    autoClose: 2000 
})

export const errorToast = (toastId: string, text: string) => toast.update(toastId, { 
    render: text, 
    type: toast.TYPE.ERROR, 
    autoClose: 5000 
})