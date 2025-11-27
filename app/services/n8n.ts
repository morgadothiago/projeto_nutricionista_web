import axios from "axios"

export const n8n = axios.create({
    baseURL: "https://n8n-ia.thinkworld.com.br/webhook/",
})
