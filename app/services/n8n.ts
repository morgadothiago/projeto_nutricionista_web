import axios from "axios"

export const n8n = axios.create({
    baseURL: process.env.NEXT_PUBLIC_N8N_URL || "https://n8n.zapnutre.com.br/webhook/zapnutri",
})
// Aqui estou passando a URL do n8n para o axios com n8h 