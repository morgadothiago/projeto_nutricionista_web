# Solução para CLIENT_FETCH_ERROR

## O Problema

Você está recebendo este erro:
```
[next-auth][error][CLIENT_FETCH_ERROR]
"Unexpected token '<', "<!DOCTYPE "... is not valid JSON"
```

**Causa**: O NextAuth está tentando se comunicar com o backend, mas está recebendo HTML em vez de JSON. Isso geralmente significa que:

1. **O backend não está rodando** (causa mais comum)
2. **A URL do backend está incorreta**
3. **O backend está retornando uma página de erro HTML**

## Correções Aplicadas

### 1. `app/services/api.ts`
- Configurado para usar `NEXT_PUBLIC_API_URL` do `.env`
- Adicionado log para mostrar a URL da API

### 2. `lib/auth.ts`
- Adicionados logs detalhados no processo de login
- Melhorado tratamento de erros de conexão
- Mensagens de erro mais claras

### 3. Criado script de verificação
- `scripts/check-backend.js` - para testar se o backend está acessível

## Como Resolver

### Passo 1: Verificar se o backend está rodando

Execute o script de verificação:

```bash
node scripts/check-backend.js
```

**Se o backend NÃO estiver rodando**, você verá:
```
❌ Erro ao conectar com o backend
🔴 Conexão recusada - Backend não está rodando
```

**Solução**: Inicie o backend na porta correta (geralmente 3000)

### Passo 2: Verificar configuração do .env

Seu arquivo `.env` deve ter:

```env
# Next.js roda nesta porta
NEXTAUTH_URL=http://localhost:3001

# Backend roda nesta porta (DIFERENTE do Next.js!)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Secret do NextAuth
NEXTAUTH_SECRET=RbOgdSNemzZ5c9LmeK74tthN0oewzvv4Y60ShevT4OE
```

**IMPORTANTE**:
- Next.js e Backend devem rodar em **portas diferentes**
- Next.js: porta **3001**
- Backend: porta **3000**

### Passo 3: Iniciar os servidores na ordem correta

1. **Primeiro, inicie o BACKEND** (porta 3000):
   ```bash
   cd /caminho/para/backend
   npm run dev
   # ou
   npm start
   ```

2. **Depois, inicie o Next.js** (porta 3001):
   ```bash
   npm run dev
   ```

### Passo 4: Testar a conexão

1. Abra o navegador em `http://localhost:3001`
2. Tente fazer login
3. Verifique os logs no terminal do Next.js:

```
🔗 API configurada para: http://localhost:3000
🔐 Tentando login com: usuario@email.com
🔗 URL da API: http://localhost:3000
✅ Resposta da API recebida: 200
```

Se você ver esses logs, a conexão está funcionando!

## Verificação Manual da API

Você pode testar o endpoint de login manualmente com curl:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com","password":"123456"}'
```

**Resposta esperada** (JSON):
```json
{
  "user": {
    "id": 1,
    "email": "teste@teste.com",
    "name": "Teste",
    "roles": "[\"paciente\"]"
  }
}
```

**Se receber HTML** (`<!DOCTYPE html>`), significa que:
- A rota `/auth/login` não existe no backend
- O backend está retornando uma página de erro
- A porta está errada

## Estrutura de Portas

```
┌─────────────────────────────────────┐
│ Navegador: http://localhost:3001   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Next.js (Frontend): :3001           │
│ - Páginas                           │
│ - NextAuth                          │
│ - SSR/SSG                           │
└──────────────┬──────────────────────┘
               │
               │ API calls
               ▼
┌─────────────────────────────────────┐
│ Backend (API): :3000                │
│ - /auth/login                       │
│ - /auth/register                    │
│ - Outras APIs                       │
└─────────────────────────────────────┘
```

## Troubleshooting

### Problema: "Porta 3000 já está em uso"

Se a porta 3000 estiver ocupada pelo Next.js, você precisa:

1. **Opção A**: Mude a porta do Next.js no `.env`:
   ```env
   NEXTAUTH_URL=http://localhost:3001
   ```
   E inicie com:
   ```bash
   PORT=3001 npm run dev
   ```

2. **Opção B**: Mude a porta do backend e atualize o `.env`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Problema: "CORS error"

Se o backend estiver rodando mas você receber erro de CORS, configure o backend para aceitar requisições de `http://localhost:3001`.

### Problema: "Cannot read property 'role' of undefined"

Se o login funcionar mas a role não aparecer, consulte o arquivo `TESTE_ROLE.md`.

## Checklist Final

- [ ] Backend está rodando na porta 3000
- [ ] Next.js está rodando na porta 3001
- [ ] `.env` tem `NEXT_PUBLIC_API_URL=http://localhost:3000`
- [ ] `.env` tem `NEXTAUTH_URL=http://localhost:3001`
- [ ] Endpoint `/auth/login` retorna JSON (não HTML)
- [ ] Console do Next.js mostra logs de conexão bem-sucedida

## Ainda com problemas?

Execute este comando e compartilhe a saída:

```bash
node scripts/check-backend.js
```

E também compartilhe:
1. Logs do terminal do Next.js
2. Logs do terminal do Backend
3. Conteúdo do arquivo `.env`
