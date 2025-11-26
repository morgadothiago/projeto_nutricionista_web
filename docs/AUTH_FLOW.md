# Fluxo de Autenticação com Redirecionamento por Role

Este documento explica como o sistema de autenticação funciona e como os usuários são redirecionados com base em suas roles (funções).

## Visão Geral

O sistema suporta dois tipos de usuários:
- **Nutricionista**: Profissionais de nutrição que gerenciam pacientes
- **Paciente**: Usuários que acompanham sua dieta e consultas

Após o login, cada tipo de usuário é redirecionado para um dashboard específico com funcionalidades adequadas ao seu perfil.

## Estrutura de Arquivos

```
app/
├── contexts/
│   └── auth-context.tsx          # Context de autenticação com lógica de redirecionamento
├── dashboard/
│   ├── page.tsx                  # Dashboard genérico (fallback)
│   ├── nutricionista/
│   │   └── page.tsx              # Dashboard específico para nutricionistas
│   └── paciente/
│       └── page.tsx              # Dashboard específico para pacientes
├── login/
│   └── page.tsx                  # Página de login
lib/
└── auth.ts                       # Configuração do NextAuth
```

## Proteção de Páginas Públicas

As páginas públicas (home, login, cadastro) verificam se o usuário já está autenticado e redirecionam automaticamente para o dashboard apropriado:

```typescript
// Exemplo em /login, /cadastro, / (home)
useEffect(() => {
  if (!isLoading && isAuthenticated && userRole) {
    if (userRole === "nutricionista") {
      router.push("/dashboard/nutricionista")
    } else if (userRole === "paciente") {
      router.push("/dashboard/paciente")
    } else {
      router.push("/dashboard")
    }
  }
}, [isLoading, isAuthenticated, userRole, router])
```

Isso garante que:
- Usuários já logados não podem acessar `/login` ou `/cadastro`
- Ao acessar a home `/`, usuários autenticados vão direto para seu dashboard
- Evita duplicação de sessões

## Fluxo de Autenticação

### 1. Usuário faz login

O usuário insere suas credenciais na página `/login`:

```typescript
// app/login/page.tsx
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  const formData = new FormData(e.currentTarget)

  await login({
    email: formData.get("email"),
    password: formData.get("password")
  })
}
```

### 2. NextAuth valida credenciais

O NextAuth envia as credenciais para a API (ou usa mock se `USE_MOCK_AUTH=true`):

```typescript
// lib/auth.ts
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  { email, password }
)

// Retorna o usuário com a role
return {
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role  // "nutricionista" ou "paciente"
}
```

### 3. Role é armazenada na sessão

Os callbacks do NextAuth armazenam a role no JWT e na sessão:

```typescript
// lib/auth.ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role  // Armazena no token
    }
    return token
  },
  async session({ session, token }) {
    if (token && session.user) {
      session.user.role = token.role  // Disponibiliza na sessão
    }
    return session
  }
}
```

### 4. Redirecionamento automático

O AuthContext detecta o login e redireciona baseado na role:

```typescript
// app/contexts/auth-context.tsx
useEffect(() => {
  if (status === "authenticated" && session?.user?.role) {
    const currentPath = window.location.pathname

    // Só redireciona se estiver na página de login
    if (currentPath === "/login") {
      const userRole = session.user.role

      if (userRole === "nutricionista") {
        router.push("/dashboard/nutricionista")
      } else if (userRole === "paciente") {
        router.push("/dashboard/paciente")
      } else {
        router.push("/dashboard")
      }
    }
  }
}, [status, session, router])
```

## Proteção de Rotas

Cada dashboard verifica se o usuário tem a role correta:

### Dashboard do Nutricionista

```typescript
// app/dashboard/nutricionista/page.tsx
useEffect(() => {
  if (status === "loading") return

  if (!session) {
    router.push("/login")
    return
  }

  // Redireciona se não for nutricionista
  if (session.user?.role !== "nutricionista") {
    router.push("/dashboard/paciente")
  }
}, [session, status, router])
```

### Dashboard do Paciente

```typescript
// app/dashboard/paciente/page.tsx
useEffect(() => {
  if (status === "loading") return

  if (!session) {
    router.push("/login")
    return
  }

  // Redireciona se não for paciente
  if (session.user?.role !== "paciente") {
    router.push("/dashboard/nutricionista")
  }
}, [session, status, router])
```

## Usuários de Teste (Modo Mock)

Para testar o sistema, use os seguintes usuários:

### Nutricionistas
```
Email: nutricionista@nutri.com
Senha: nutri123
Nome: Dra. Ana Silva

Email: nutri2@nutri.com
Senha: nutri123
Nome: Dr. Carlos Santos
```

### Pacientes
```
Email: paciente@email.com
Senha: paciente123
Nome: João Oliveira

Email: maria@email.com
Senha: paciente123
Nome: Maria Costa
```

## Configuração da API

### Modo Mock (Desenvolvimento)

```env
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

### Modo API (Produção)

```env
USE_MOCK_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Estrutura da Resposta da API

A API deve retornar um objeto com a seguinte estrutura:

```json
{
  "id": "uuid-do-usuario",
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "role": "nutricionista" // ou "paciente"
}
```

### Endpoint Esperado

```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "usuario@email.com",
  "password": "senha123"
}

Response (200 OK):
{
  "id": "uuid",
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "role": "nutricionista"
}

Response (401 Unauthorized):
{
  "message": "Credenciais inválidas",
  "error": "Invalid credentials"
}
```

## Diagrama do Fluxo

```
┌─────────────┐
│   Login     │
│   Page      │
└──────┬──────┘
       │
       │ 1. Submete credenciais
       ▼
┌─────────────┐
│  NextAuth   │
│  Authorize  │
└──────┬──────┘
       │
       │ 2. Valida com API/Mock
       ▼
┌─────────────┐
│  API/Mock   │ ← Retorna user com role
└──────┬──────┘
       │
       │ 3. Cria sessão com role
       ▼
┌─────────────┐
│ AuthContext │
│  useEffect  │
└──────┬──────┘
       │
       │ 4. Detecta login e role
       ├─────────────────┬─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Nutricionista│  │  Paciente   │  │  Dashboard  │
│  Dashboard  │  │  Dashboard  │  │  (Fallback) │
└─────────────┘  └─────────────┘  └─────────────┘
```

## Troubleshooting

### Login não redireciona

1. Verifique se a API está retornando o campo `role`
2. Verifique os logs do console para erros
3. Confirme que `NEXT_PUBLIC_API_URL` está correto

### Redirecionamento para dashboard errado

1. Verifique a role do usuário no banco de dados
2. Confirme que a role é exatamente `"nutricionista"` ou `"paciente"` (lowercase)
3. Verifique os logs do NextAuth

### Usuário cai em loop de redirecionamento

1. Verifique se a proteção de rota está verificando `status === "loading"`
2. Confirme que a role está sendo armazenada corretamente na sessão
3. Limpe os cookies e tente novamente

## Próximos Passos

Para adicionar novas roles:

1. Atualize o tipo `UserRole` em `types/NewAccounts.ts`
2. Crie uma nova pasta em `app/dashboard/[nova-role]/`
3. Adicione a lógica de redirecionamento no `auth-context.tsx`
4. Implemente a proteção de rota no novo dashboard
