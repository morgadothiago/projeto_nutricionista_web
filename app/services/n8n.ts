import axios from "axios"

export const n8n = axios.create({
    baseURL:  "https://n8n.zapnutre.com.br/webhook/zapnutri",
})
// Aqui estou passando a URL do n8n para o axios com n8h 