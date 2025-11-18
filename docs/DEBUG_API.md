# Guia de Debug - Erro 400 na API

## O que significa erro 400?

O erro 400 (Bad Request) significa que a API recebeu uma requisição mal formatada. Isso pode acontecer por vários motivos.

## Verificações Rápidas

### 1. Verifique os logs no console

Após adicionar os logs de debug, você verá no console do servidor:

```
🌐 Usando autenticação via API
📍 URL: http://localhost:3001/auth/login
📦 Payload: { email: "usuario@email.com", password: "[OCULTA]" }
❌ Erro na autenticação: [erro]
📊 Status: 400
📄 Dados do erro: { message: "..." }
🔧 Headers: {...}
```

**IMPORTANTE**: Olhe especialmente a linha **"📄 Dados do erro"** - ela mostrará exatamente o que a API está retornando como erro.

### 2. Possíveis causas do erro 400

#### Causa 1: Endpoint incorreto

Sua API pode estar usando um endpoint diferente. Tente alterar em `lib/auth.ts` linha 60:

```typescript
// Opções comuns de endpoints:
"/auth/login"           // Padrão atual
"/auth/sign-in"         // Alternativa 1
"/api/auth/login"       // Alternativa 2
"/api/v1/auth/login"    // Alternativa 3
"/login"                // Alternativa 4
"/signin"               // Alternativa 5
```

#### Causa 2: Campos com nomes diferentes

Sua API pode esperar campos diferentes. Exemplos comuns:

```typescript
// Opção 1: username ao invés de email
{
  username: credentials.email,  // ou credentials.username
  password: credentials.password
}

// Opção 2: user ao invés de email
{
  user: credentials.email,
  password: credentials.password
}

// Opção 3: Campos adicionais obrigatórios
{
  email: credentials.email,
  password: credentials.password,
  grant_type: "password"  // Comum em OAuth
}
```

#### Causa 3: Headers faltando

Algumas APIs requerem headers específicos:

```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  { email, password },
  {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      // Se a API requer uma API key:
      // "X-API-Key": "sua-api-key-aqui",
    },
  }
)
```

#### Causa 4: URL base incorreta

Verifique se a URL em `.env` está correta:

```env
# Certifique-se que não tem barra no final
NEXT_PUBLIC_API_URL=http://localhost:3001  ✅
NEXT_PUBLIC_API_URL=http://localhost:3001/ ❌ (pode causar //auth/login)
```

### 3. Como descobrir o que sua API espera

#### Método 1: Teste com curl

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@teste.com","password":"123456"}'
```

#### Método 2: Teste com Postman/Insomnia

1. Abra Postman ou Insomnia
2. Crie uma requisição POST para `http://localhost:3001/auth/login`
3. Configure o body como JSON:
   ```json
   {
     "email": "teste@teste.com",
     "password": "123456"
   }
   ```
4. Envie e veja a resposta

#### Método 3: Consulte a documentação da API

- Verifique a documentação do seu backend
- Procure por Swagger/OpenAPI em `http://localhost:3001/docs` ou `/api-docs`

## Soluções Comuns

### Solução 1: Alterar endpoint

Em `lib/auth.ts`, linha 60, altere para o endpoint correto:

```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/SEU_ENDPOINT_AQUI`,  // ← Altere aqui
  {
    email: credentials.email,
    password: credentials.password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
```

### Solução 2: Alterar formato do payload

Se sua API usa `username` ao invés de `email`:

```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  {
    username: credentials.email,  // ← Mudou de 'email' para 'username'
    password: credentials.password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
```

### Solução 3: Adicionar validações

Se a API retorna mensagens de erro específicas, você pode tratá-las:

```typescript
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("📊 Status:", error.response?.status)
    console.error("📄 Dados do erro:", error.response?.data)

    // Mensagens específicas baseadas no erro da API
    if (error.response?.status === 400) {
      const apiError = error.response.data

      // Sua API pode retornar algo como:
      // { message: "Email is required" }
      // { error: "Invalid credentials" }
      // { errors: [{ field: "email", message: "Email inválido" }] }

      console.error("Detalhes do erro 400:", apiError)
      throw new Error(apiError.message || apiError.error || "Credenciais inválidas")
    }
  }
}
```

## Checklist de Debug

- [ ] Conferir URL no `.env` (sem barra no final)
- [ ] Verificar se o backend está rodando
- [ ] Testar o endpoint com curl/Postman
- [ ] Verificar os logs "📄 Dados do erro" no console
- [ ] Confirmar formato do payload esperado pela API
- [ ] Verificar se headers necessários estão sendo enviados
- [ ] Conferir se o endpoint está correto
- [ ] Verificar se a porta está correta (3001, 4000, 8000, etc)

## Exemplo de API Backend Esperada

Se você estiver criando o backend, ele deve ser algo assim:

### Express.js

```javascript
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  // Validação
  if (!email || !password) {
    return res.status(400).json({
      message: "Email e senha são obrigatórios"
    })
  }

  // Autenticação
  const user = await authenticateUser(email, password)

  if (!user) {
    return res.status(401).json({
      message: "Credenciais inválidas"
    })
  }

  // Sucesso - retorna conforme esperado pelo frontend
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,  // "nutricionista" ou "paciente"
    token: generateToken(user)  // opcional
  })
})
```

### NestJS

```typescript
@Post('login')
async login(@Body() loginDto: LoginDto) {
  const { email, password } = loginDto

  const user = await this.authService.validateUser(email, password)

  if (!user) {
    throw new UnauthorizedException('Credenciais inválidas')
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    token: this.authService.generateToken(user)
  }
}
```

## Ainda com problemas?

1. **Compartilhe os logs**: Copie a saída do console mostrando:
   - 📍 URL
   - 📄 Dados do erro

2. **Verifique CORS**: Se o erro for de CORS (não 400), configure o backend:
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }))
   ```

3. **Use modo Mock temporariamente**:
   - Configure `USE_MOCK_AUTH=true` no `.env`
   - Isso permite testar o frontend enquanto arruma o backend
