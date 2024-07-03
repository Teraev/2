import axios from "axios"

const base_url = import.meta.env.VITE_BASE_URL
const fixer_url = import.meta.env.VITE_PUBLIC_FIXER_URL


export async function postData(endpoint, body) {
    try {
        const res = await axios.post(base_url + endpoint, body)
        return res
    } catch (error) {
        return { status: 500, error }
    }


}


export async function getData(endpoint) {
    try {
        const res = await axios.get(base_url + endpoint)
        return res
    } catch (error) {
        return { status: 500, error }
    }


}


export async function patchData(path, body) {
    try {
        const res = await axios.patch(base_url + path, body)
        console.log(res);

        if (res.status === 200 || res.status == 201) {
            return res.data
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getFixers(endpoint) {

    const locale = localStorage.getItem('symbols')

    if (!locale) {

        try {
            const res = await axios.get(fixer_url + endpoint, {
                headers: {
                    apikey: import.meta.env.VITE_API_KEY,
                    "Content-Type": "application/json"
                }
            })

            localStorage.setItem('symbols', JSON.stringify(res.data.symbols))

            return res.data.symbols
            console.log(res.data.symbols);
        } catch (error) {
            return { status: 500, error }
        }
    }
    return JSON.parse(locale)
}
