export const apiCall = (file: File): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.onabort = () => reject('File reading was aborted')
            reader.onerror = () => reject('File reading has failed')
            reader.readAsDataURL(file)
        }, 1000)
    });
}