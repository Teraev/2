import axios from "axios"

const base_url = "http://localhost:8080"


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