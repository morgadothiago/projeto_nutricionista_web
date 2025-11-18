# Quick Fix - Erro 400

## Teste estas alterações rapidamente

### Opção 1: Endpoint diferente

Em `lib/auth.ts`, linha 60, teste cada um destes:

```typescript
// Teste 1
`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`

// Teste 2
`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`

// Teste 3
`${process.env.NEXT_PUBLIC_API_URL}/login`

// Teste 4
`${process.env.NEXT_PUBLIC_API_URL}/api/login`
```

### Opção 2: Campo username ao invés de email

Em `lib/auth.ts`, linhas 61-64, altere para:

```typescript
{
  username: credentials.email,
  password: credentials.password,
}
```

### Opção 3: Usar modo Mock enquanto arruma

No arquivo `.env`:

```env
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

Isso permite você testar o frontend enquanto investiga o problema da API.

## Após fazer login, olhe no console

Você verá algo como:

```
📍 URL: http://localhost:3001/auth/login
📄 Dados do erro: { message: "User validation failed: email: Path `email` is required." }
```

A mensagem em **"📄 Dados do erro"** dirá exatamente o problema!

## Próximos passos

1. Tente o login novamente
2. Olhe os logs no console do terminal (onde você roda `npm run dev`)
3. Veja a mensagem em "📄 Dados do erro"
4. Com base na mensagem, ajuste o código

## Precisa de mais ajuda?

Compartilhe:
- O log completo que aparece no console
- Qual endpoint sua API usa
- Qual formato de payload sua API espera
