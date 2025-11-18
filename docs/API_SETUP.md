# Guia de Configuração da API

Este documento explica como configurar os endpoints da API para o projeto Nutri Web.

## Configuração de Ambiente

1. **Copie o arquivo `.env.example` para `.env`**:
   ```bash
   cp .env.example .env
   ```

2. **Configure as variáveis de ambiente**:

### Variáveis Importantes

```env
# URL da sua API backend
NEXT_PUBLIC_API_URL=http://localhost:3001

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua-chave-secreta-aqui

# Modo de autenticação
# true = usa autenticação mock local (desenvolvimento)
# false = usa API externa (produção)
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

## Endpoints da API

O arquivo `app/services/api.ts` está preparado para os seguintes endpoints:

### 1. Login
- **Endpoint**: `POST /auth/sign-in`
- **Payload**:
  ```json
  {
    "email": "usuario@email.com",
    "password": "senha123"
  }
  ```
- **Resposta esperada**:
  ```json
  {
    "id": "uuid",
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "role": "nutricionista" | "paciente",
    "token": "jwt-token" (opcional)
  }
  ```

### 2. Cadastro
- **Endpoint**: `POST /auth/sign-up` ou `/auth/accounts`
- **Payload**:
  ```json
  {
    "email": "novo@email.com",
    "password": "senha123",
    "name": "Nome" (opcional),
    "phone": "11999999999" (opcional),
    "role": "paciente" | "nutricionista" (opcional)
  }
  ```
- **Resposta esperada**:
  ```json
  {
    "id": "uuid",
    "email": "novo@email.com",
    "name": "Nome",
    "role": "paciente",
    "message": "Cadastro realizado com sucesso" (opcional)
  }
  ```

## Alterando os Endpoints

### 1. Atualizar a URL base

No arquivo `app/services/api.ts`, a URL base já está configurada:

```typescript
export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  // ...
})
```

### 2. Alterar endpoint de login

Procure pela função `SignIn` em `app/services/api.ts`:

```typescript
export async function SignIn(login: ILogin): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/sign-in", {
    // Altere "/auth/sign-in" para o seu endpoint
    // Exemplos: "/auth/login", "/login", "/api/auth/login"
  })
}
```

### 3. Alterar endpoint de cadastro

Procure pela função `SignUp` em `app/services/api.ts`:

```typescript
export async function SignUp(register: RegisterFormData): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/sign-up", payload)
  // Altere "/auth/sign-up" para o seu endpoint
  // Exemplos: "/auth/register", "/register", "/api/users"
}
```

## Autenticação com Token

Se sua API retorna um token JWT, você pode salvá-lo:

### Salvar o token após login

No arquivo `app/services/api.ts`, a função `SignIn` já tem um comentário indicando onde salvar o token:

```typescript
if (response.data.token) {
  // Descomente para salvar o token
  localStorage.setItem('token', response.data.token)
  // ou use sessionStorage
  // sessionStorage.setItem('token', response.data.token)
}
```

### Adicionar token nas requisições

O interceptor já está configurado. Descomente as linhas:

```typescript
api.interceptors.request.use(
  (config) => {
    // Descomente estas linhas:
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)
```

## Estrutura de Tipos

Todos os tipos estão organizados em `/types/`:

- **`NewAccounts.ts`**: Tipos de cadastro e user role
- **`login.ts`**: Tipos de login e resposta de autenticação
- **`dashboard.ts`**: Tipos do menu e navegação
- **`index.ts`**: Exporta todos os tipos

## Integração com NextAuth

O NextAuth já está configurado em `lib/auth.ts`. Ele:

- Usa autenticação por credenciais
- Suporta modo mock (desenvolvimento)
- Suporta API externa (produção)
- Armazena dados do usuário na sessão

Para usar sua API com NextAuth, edite `lib/auth.ts` na função `authorize`:

```typescript
// Linha 54-60 em lib/auth.ts
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,  // Seu endpoint aqui
  {
    email: credentials.email,
    password: credentials.password,
  }
)
```

## Testando

1. **Modo Mock (Desenvolvimento)**:
   - Configure `USE_MOCK_AUTH=true` no `.env`
   - Usa dados de teste em `mocks/index.ts`

2. **Modo API Real (Produção)**:
   - Configure `USE_MOCK_AUTH=false` no `.env`
   - Configure `NEXT_PUBLIC_API_URL` com a URL da sua API
   - Certifique-se de que sua API está rodando

## Exemplos de Uso

### Login
```typescript
import { SignIn } from '@/app/services/api'

const handleLogin = async () => {
  try {
    const userData = await SignIn({
      email: 'usuario@email.com',
      password: 'senha123'
    })
    console.log('Usuário logado:', userData)
  } catch (error) {
    console.error('Erro no login:', error)
  }
}
```

### Cadastro
```typescript
import { SignUp } from '@/app/services/api'

const handleRegister = async () => {
  try {
    const newUser = await SignUp({
      email: 'novo@email.com',
      password: 'senha123',
      name: 'Novo Usuário'
    })
    console.log('Usuário cadastrado:', newUser)
  } catch (error) {
    console.error('Erro no cadastro:', error)
  }
}
```

## Troubleshooting

### CORS Errors
Se você receber erros de CORS, configure o backend para aceitar requisições do frontend:

```javascript
// No seu backend (exemplo com Express)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

### Network Errors
- Verifique se o backend está rodando
- Confirme se a URL em `NEXT_PUBLIC_API_URL` está correta
- Verifique o console do browser para ver detalhes do erro

### 401 Unauthorized
- Verifique se as credenciais estão corretas
- Confirme se o endpoint está correto
- Verifique se o token está sendo enviado corretamente

## Próximos Passos

Para adicionar mais endpoints da API, adicione funções em `app/services/api.ts` seguindo o padrão:

```typescript
export async function meuEndpoint(data: TipoInput): Promise<TipoOutput> {
  try {
    const response = await api.post<TipoOutput>("/meu-endpoint", data)
    return response.data
  } catch (error) {
    // Tratamento de erro
    throw new Error("Mensagem de erro")
  }
}
```
