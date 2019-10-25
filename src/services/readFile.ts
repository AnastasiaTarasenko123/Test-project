
export const readFileASync = (file: File) => (
    new Promise((resolve: (v: string) => void, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
)