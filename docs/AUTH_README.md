# 🔐 NextAuth Credentials Provider - Guia de Uso

Este projeto está configurado com NextAuth usando o provider de Credentials para autenticação.

## 📁 Estrutura de Arquivos Criados

```
nutri_web/
├── types/
│   └── next-auth.d.ts          # Tipagem TypeScript do NextAuth
├── lib/
│   └── auth.ts                 # Configuração principal do NextAuth
├── components/
│   └── providers/
│       └── session-provider.tsx # Wrapper do SessionProvider
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts    # Rota API do NextAuth
│   ├── login/
│   │   └── page.tsx           # Página de login
│   ├── dashboard/
│   │   └── page.tsx           # Página protegida de exemplo
│   └── layout.tsx             # Layout atualizado com SessionProvider
├── middleware.ts              # Middleware para proteção de rotas
├── .env                       # Variáveis de ambiente
└── .env.example              # Exemplo de variáveis de ambiente
```

## ⚙️ Configuração Inicial

### 1. Variáveis de Ambiente

Configure as variáveis no arquivo `.env`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Gerar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Configurar sua API de Autenticação

Edite o arquivo `lib/auth.ts` e atualize a URL da sua API:

```typescript
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  {
    email: credentials.email,
    password: credentials.password,
  }
);
```

A resposta da sua API deve retornar um objeto com pelo menos:
```json
{
  "id": "123",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "role": "user" // opcional
}
```

## 🚀 Como Usar

### Fazer Login

Use a função `signIn` do NextAuth:

```typescript
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginExample() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Erro no login");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <button onClick={() => handleLogin("user@email.com", "password")}>
      Login
    </button>
  );
}
```

### Fazer Logout

```typescript
"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })}>
      Sair
    </button>
  );
}
```

### Acessar Sessão no Cliente

```typescript
"use client";

import { useSession } from "next-auth/react";

export default function ProfileComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (!session) {
    return <div>Não autenticado</div>;
  }

  return (
    <div>
      <p>Email: {session.user.email}</p>
      <p>Nome: {session.user.name}</p>
      <p>ID: {session.user.id}</p>
    </div>
  );
}
```

### Acessar Sessão no Servidor

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ServerComponent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Não autenticado</div>;
  }

  return (
    <div>
      <p>Bem-vindo, {session.user.name}</p>
    </div>
  );
}
```

### Proteger Rotas com Middleware

O middleware já está configurado em `middleware.ts`. Ele protege todas as rotas exceto:
- `/login`
- `/api/auth/*`
- Arquivos estáticos

Para modificar quais rotas são protegidas, edite o `matcher` no arquivo:

```typescript
export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|login|public).*)",
  ],
};
```

### Proteger Rotas Manualmente

Para páginas específicas:

```typescript
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  return <div>Conteúdo protegido</div>;
}
```

## 🔒 Proteção por Role

Para adicionar verificação de roles/permissões:

1. Edite `lib/auth.ts` e adicione lógica no callback `jwt`:

```typescript
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
      token.role = user.role; // Adicione role aqui
    }
    return token;
  },
  async session({ session, token }) {
    if (token) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
    }
    return session;
  },
}
```

2. Use no middleware:

```typescript
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Verificar se é admin
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (token?.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
```

## 📝 Páginas de Exemplo

### Login
Acesse: `http://localhost:3000/login`

### Dashboard (Protegido)
Acesse: `http://localhost:3000/dashboard`

## 🐛 Troubleshooting

### Erro: "No session found"
- Verifique se o `SessionProvider` está envolvendo sua aplicação no `layout.tsx`
- Certifique-se de que está usando `"use client"` em componentes que usam `useSession`

### Erro: "Invalid credentials"
- Verifique se a URL da API está correta no `.env`
- Confirme que sua API está retornando os dados no formato esperado
- Verifique os logs do servidor da API

### Redirect Loop
- Certifique-se de que a página de login (`/login`) não está no `matcher` do middleware
- Verifique se o `NEXTAUTH_URL` está correto no `.env`

## 📚 Recursos Adicionais

- [Documentação NextAuth.js](https://next-auth.js.org/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Middleware do Next.js](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## 🎯 Próximos Passos

1. Customize a página de login com sua UI
2. Adicione refresh tokens se necessário
3. Implemente recuperação de senha
4. Adicione autenticação de dois fatores (2FA)
5. Configure providers adicionais (Google, GitHub, etc.)

---

**Desenvolvido com ❤️ usando NextAuth.js**
