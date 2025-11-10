# 🚀 Quick Start - NextAuth Credentials Provider

## 📦 O que foi criado?

### Estrutura Completa:
```
nutri_web/
├── types/next-auth.d.ts              # ✅ Tipos do NextAuth
├── lib/
│   ├── auth.ts                       # ✅ Configuração principal
│   └── hooks/use-auth.ts             # ✅ Hooks customizados
├── components/
│   ├── providers/session-provider.tsx # ✅ Provider de sessão
│   └── auth/
│       ├── protected-route.tsx       # ✅ Componente de proteção
│       └── role-guard.tsx            # ✅ Guard por role
├── app/
│   ├── api/auth/[...nextauth]/route.ts # ✅ Rota API
│   ├── login/page.tsx                # ✅ Página de login
│   ├── dashboard/page.tsx            # ✅ Dashboard protegido
│   ├── examples/page.tsx             # ✅ Página de exemplos
│   └── unauthorized/page.tsx         # ✅ Página de não autorizado
└── middleware.ts                     # ✅ Middleware de proteção
```

## ⚡ Começar Agora

### 1. O projeto já está pronto para usar! 🎉

**Modo Local (Mock) está ativado por padrão:**
- ✅ Usuários de teste pré-configurados
- ✅ Sem necessidade de API externa
- ✅ Pronto para começar a desenvolver

### 2. Usuários de Teste Disponíveis

| Email | Senha | Role |
|-------|-------|------|
| admin@example.com | admin123 | admin |
| user@example.com | user123 | user |
| test@test.com | test123 | user |

### 3. Inicie o servidor
```bash
npm run dev
# ou
yarn dev
```

### 4. Teste a aplicação
- **Home:** http://localhost:3000
- **Login:** http://localhost:3000/login (verá os usuários de teste)
- **Dashboard:** http://localhost:3000/dashboard
- **Exemplos:** http://localhost:3000/examples

### 5. Quando estiver pronto para usar sua API

Edite o arquivo `.env` e altere:
```env
USE_MOCK_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=http://localhost:4000  # Sua URL da API
```

**📖 Guia completo:** Veja `MODO_LOCAL_VS_API.md` para instruções detalhadas

## 💡 Uso Rápido

### Hook de Autenticação
```typescript
"use client";
import { useAuth } from "@/lib/hooks/use-auth";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated) return <div>Faça login</div>;

  return <div>Olá, {user.name}!</div>;
}
```

### Fazer Login
```typescript
import { signIn } from "next-auth/react";

await signIn("credentials", {
  email: "user@email.com",
  password: "password",
  redirect: false,
});
```

### Fazer Logout
```typescript
import { signOut } from "next-auth/react";

signOut({ callbackUrl: "/login" });
```

### Proteger Componentes por Role
```typescript
import { RoleGuard } from "@/components/auth";

<RoleGuard allowedRoles={["admin"]}>
  <AdminPanel />
</RoleGuard>
```

### Acessar Sessão no Servidor
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
```

## 🔐 Rotas Protegidas

### Adicionar Rotas no Middleware
Edite `middleware.ts`:
```typescript
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",      // Adicione aqui
    "/profile/:path*",    // Adicione aqui
  ],
};
```

## 📖 Documentação Completa

Para documentação detalhada, consulte:
- **AUTH_README.md** - Guia completo de uso
- **/examples** - Página com exemplos práticos

## 🎯 Próximos Passos

1. ✅ Configurar sua API de autenticação
2. ✅ Personalizar a página de login
3. ✅ Adicionar mais rotas protegidas
4. ✅ Implementar recuperação de senha
5. ✅ Adicionar refresh tokens

## 🆘 Problemas Comuns

**Erro "No session found"**
- Verifique se o SessionProvider está no layout.tsx
- Use "use client" em componentes que usam hooks

**Redirect loop**
- Certifique-se de que /login não está no matcher do middleware

**API não responde**
- Verifique NEXT_PUBLIC_API_URL no .env
- Teste a API diretamente com Postman/Insomnia

---

**Dúvidas?** Consulte AUTH_README.md para documentação completa!
