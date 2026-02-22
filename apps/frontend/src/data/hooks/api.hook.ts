export default function useApi() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }

    async function get<T>(url: string) {
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'GET',
            headers,
        })
        await handleErrors(response)
        return response.json()
    }

    async function post<T>(url: string, body: T) {
        console.log('post', url, body)
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        })
        await handleErrors(response)
        return response.json()
    }

    async function handleErrors(response: Response) {
        if (!response.ok) {
            const json = await response.json()
            console.log(json)
            throw new Error(json.errors ?? 'Erro desconhecido')
        }
    }

    return { get, post }
}
