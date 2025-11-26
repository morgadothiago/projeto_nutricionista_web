# Integração com a API

Este documento explica como o front-end se integra com sua API rodando em `http://localhost:3000`.

## Configuração Atual

O sistema está configurado para usar sua API real através das seguintes variáveis de ambiente:

```env
# .env
USE_MOCK_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Endpoint de Login

### Request
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### Response Esperada (Sucesso - 200)
```json
{
  "id": "uuid-do-usuario",
  "email": "usuario@email.com",
  "name": "Nome do Usuário",
  "role": "nutricionista"  // ou "paciente"
}
```

### Response (Erro - 401)
```json
{
  "message": "Invalid credentials",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## Campos Obrigatórios na Resposta

Para que o sistema funcione corretamente, a API **DEVE** retornar os seguintes campos:

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `id` | string | ID único do usuário | "550e8400-e29b-41d4-a716-446655440000" |
| `email` | string | Email do usuário | "nutricionista@nutri.com" |
| `name` | string | Nome completo do usuário | "Dra. Ana Silva" |
| `role` | string | Role do usuário | "nutricionista" ou "paciente" |

### ⚠️ Importante: Campo `role`

O campo `role` é **CRÍTICO** para o sistema funcionar corretamente. Ele determina:

1. **Para qual dashboard o usuário será redirecionado:**
   - `"nutricionista"` → `/dashboard/nutricionista`
   - `"paciente"` → `/dashboard/paciente`

2. **Quais funcionalidades o usuário pode acessar**

3. **A proteção de rotas e permissões**

### Valores aceitos para `role`:
- `"nutricionista"` (exatamente assim, em lowercase)
- `"paciente"` (exatamente assim, em lowercase)

## Endpoint de Registro

### Registro de Paciente
```http
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "name": "Nome do Paciente",
  "email": "paciente@email.com",
  "password": "senha123",
  "whatsappNumber": "11987654321"
}
```

### Registro de Nutricionista
```http
POST http://localhost:3000/auth/register-doctor
Content-Type: application/json

{
  "name": "Nome do Nutricionista",
  "email": "nutricionista@email.com",
  "phone": "11987654321",
  "crn": "12345",
  "especialidade": "Nutrição Esportiva",
  "password": "senha123",
  "role": "nutricionista"
}
```

## Como Testar a Integração

### 1. Verificar se a API está rodando
```bash
curl http://localhost:3000
```

Deve retornar algo como:
```json
{"message":"Cannot GET /","error":"Not Found","statusCode":404}
```

### 2. Testar o endpoint de login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seu_usuario@email.com",
    "password": "sua_senha"
  }'
```

### 3. Verificar a resposta
A resposta deve conter os campos: `id`, `email`, `name`, e `role`

## Fluxo de Autenticação com a API

```
┌──────────────┐
│  Usuário faz │
│    login     │
└──────┬───────┘
       │
       │ 1. Envia email/senha
       ▼
┌──────────────────┐
│   NextAuth       │
│  lib/auth.ts     │
└──────┬───────────┘
       │
       │ 2. POST /auth/login
       ▼
┌──────────────────┐
│   Sua API        │
│ localhost:3000   │
└──────┬───────────┘
       │
       │ 3. Valida credenciais
       │    e retorna usuário
       ▼
┌──────────────────┐
│  { id, email,    │
│    name, role }  │
└──────┬───────────┘
       │
       │ 4. Cria sessão JWT
       ▼
┌──────────────────┐
│  AuthContext     │
│  Redireciona     │
└──────┬───────────┘
       │
       │ 5. Baseado na role
       ├──────────────┬──────────────┐
       ▼              ▼              ▼
┌──────────┐   ┌──────────┐   ┌──────────┐
│Nutri     │   │Paciente  │   │Dashboard │
│Dashboard │   │Dashboard │   │Generic   │
└──────────┘   └──────────┘   └──────────┘
```

## Checklist de Integração

- [x] API rodando em `http://localhost:3000`
- [x] Endpoint `/auth/login` disponível
- [ ] API retorna campo `role` no login
- [ ] Testar login com usuário nutricionista
- [ ] Testar login com usuário paciente
- [ ] Verificar redirecionamento após login

## Troubleshooting

### Login não funciona / Erro 401

**Possíveis causas:**
1. Credenciais incorretas
2. Usuário não existe no banco de dados
3. Senha não corresponde

**Como verificar:**
```bash
# Testar login manualmente
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"seu_email","password":"sua_senha"}'
```

### API não retorna campo `role`

**Problema:** O campo `role` não está sendo retornado pela API

**Solução:** Verifique o backend e garanta que o campo `role` seja incluído na resposta do login

**Exemplo de código backend (NestJS/Express):**
```typescript
// ✅ CORRETO
return {
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role  // ← Essencial!
}

// ❌ ERRADO (faltando role)
return {
  id: user.id,
  email: user.email,
  name: user.name
}
```

### Redirecionamento não funciona

**Problema:** Após login, não redireciona para dashboard correto

**Verificar:**
1. A API está retornando o campo `role`?
2. O valor de `role` é exatamente `"nutricionista"` ou `"paciente"`?
3. Não há espaços extras ou letras maiúsculas?

**Debug:**
Abra o console do navegador e procure por logs do tipo:
```
🌐 Usando autenticação via API
📍 URL: http://localhost:3000/auth/login
✅ Resposta da API: { id: "...", email: "...", name: "...", role: "..." }
```

### CORS Error

**Problema:** Erro de CORS ao fazer login

**Solução:** Configure CORS no backend para aceitar requisições do front-end:

```typescript
// NestJS
app.enableCors({
  origin: 'http://localhost:3001',
  credentials: true,
});

// Express
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));
```

## Próximos Passos

1. **Testar login** com um usuário existente na sua API
2. **Verificar** se a API retorna o campo `role`
3. **Ajustar** o backend se necessário para incluir o campo `role`
4. **Criar** usuários de teste com diferentes roles no banco de dados
