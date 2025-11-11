# Guia de Uso do AuthContext

Este documento explica como usar o contexto de autenticação no projeto Zap Nutre.

## Índice

1. [Visão Geral](#visão-geral)
2. [Instalação](#instalação)
3. [Uso Básico](#uso-básico)
4. [Hooks Disponíveis](#hooks-disponíveis)
5. [Exemplos Práticos](#exemplos-práticos)

---

## Visão Geral

O AuthContext fornece uma camada de abstração sobre o NextAuth, facilitando o gerenciamento de autenticação em toda a aplicação.

### Recursos

- ✅ Estado de autenticação global
- ✅ Informações do usuário acessíveis
- ✅ Métodos de login/logout simplificados
- ✅ Verificação de roles (nutricionista/paciente)
- ✅ Proteção de rotas e componentes
- ✅ Hooks customizados para casos de uso comuns

---

## Instalação

O AuthProvider já está configurado no layout principal (`app/layout.tsx`). Não é necessário fazer nenhuma configuração adicional.

---

## Uso Básico

### 1. Hook `useAuthContext`

Use este hook em qualquer componente para acessar o contexto de autenticação.

```tsx
import { useAuthContext } from "@/contexts/auth-context";

function MyComponent() {
  const { isAuthenticated, user, userRole, logout } = useAuthContext();

  if (!isAuthenticated) {
    return <div>Por favor, faça login</div>;
  }

  return (
    <div>
      <h1>Olá, {user?.name}!</h1>
      <p>Você é: {userRole}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

## Hooks Disponíveis

### 1. `useAuthContext()`

Hook principal que retorna todo o contexto de autenticação.

```tsx
const {
  // Estado
  session,           // Sessão completa do NextAuth
  user,              // Dados do usuário
  isAuthenticated,   // Boolean: está autenticado?
  isLoading,         // Boolean: está carregando?

  // Informações do usuário
  userRole,          // "nutricionista" | "paciente" | null
  userName,          // Nome do usuário
  userEmail,         // Email do usuário
  userId,            // ID do usuário

  // Métodos
  login,             // Função para fazer login
  logout,            // Função para fazer logout

  // Verificações
  hasRole,           // Verifica se tem uma role específica
  isNutricionista,   // Boolean: é nutricionista?
  isPaciente,        // Boolean: é paciente?

  // Navegação
  redirectIfNotAuthenticated,  // Redireciona se não autenticado
  redirectIfNotRole,           // Redireciona se não tiver a role
} = useAuthContext();
```

### 2. `useRequireAuth(options?)`

Hook que protege componentes, redirecionando usuários não autenticados.

```tsx
import { useRequireAuth } from "@/contexts/auth-context";

function ProtectedComponent() {
  // Redireciona para /login se não estiver autenticado
  const { user } = useRequireAuth();

  return <div>Conteúdo protegido para {user?.name}</div>;
}
```

Com opções:

```tsx
function AdminComponent() {
  // Redireciona se não for nutricionista
  const { user } = useRequireAuth({
    requiredRole: "nutricionista",
    redirectTo: "/unauthorized"
  });

  return <div>Área do nutricionista</div>;
}
```

### 3. `useRequireNutricionista()`

Atalho para proteger componentes que requerem role de nutricionista.

```tsx
import { useRequireNutricionista } from "@/contexts/auth-context";

function NutricionistaPage() {
  const { user } = useRequireNutricionista();

  return <div>Bem-vindo, Dr(a). {user?.name}</div>;
}
```

### 4. `useRequirePaciente()`

Atalho para proteger componentes que requerem role de paciente.

```tsx
import { useRequirePaciente } from "@/contexts/auth-context";

function PacientePage() {
  const { user } = useRequirePaciente();

  return <div>Olá, {user?.name}!</div>;
}
```

---

## Exemplos Práticos

### Exemplo 1: Componente de Header

```tsx
"use client";

import { useAuthContext } from "@/contexts/auth-context";

export function Header() {
  const { isAuthenticated, userName, userRole, logout } = useAuthContext();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-4">
      <div>
        <p className="font-semibold">{userName}</p>
        <p className="text-sm text-gray-500 capitalize">{userRole}</p>
      </div>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Sair
      </button>
    </header>
  );
}
```

### Exemplo 2: Formulário de Login

```tsx
"use client";

import { useState } from "react";
import { useAuthContext } from "@/contexts/auth-context";
import { toast } from "sonner";

export function LoginForm() {
  const { login, isLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
```

### Exemplo 3: Renderização Condicional por Role

```tsx
"use client";

import { useAuthContext } from "@/contexts/auth-context";

export function Dashboard() {
  const { isNutricionista, isPaciente, userName } = useAuthContext();

  return (
    <div>
      <h1>Dashboard - Olá, {userName}!</h1>

      {isNutricionista && (
        <div>
          <h2>Área do Nutricionista</h2>
          <p>Gerencie seus pacientes e consultas</p>
        </div>
      )}

      {isPaciente && (
        <div>
          <h2>Área do Paciente</h2>
          <p>Acompanhe seu plano alimentar</p>
        </div>
      )}
    </div>
  );
}
```

### Exemplo 4: Proteção de Página Completa

```tsx
"use client";

import { useRequireNutricionista } from "@/contexts/auth-context";

export default function PacientesPage() {
  // Automaticamente redireciona se não for nutricionista
  const { isLoading } = useRequireNutricionista();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Gerenciar Pacientes</h1>
      {/* Conteúdo da página */}
    </div>
  );
}
```

### Exemplo 5: Verificação Manual de Role

```tsx
"use client";

import { useAuthContext } from "@/contexts/auth-context";
import { useEffect } from "react";

export function ConditionalFeature() {
  const { hasRole, redirectIfNotRole } = useAuthContext();

  useEffect(() => {
    // Redireciona se não for nutricionista
    redirectIfNotRole("nutricionista", "/dashboard");
  }, [redirectIfNotRole]);

  if (!hasRole("nutricionista")) {
    return null;
  }

  return <div>Funcionalidade exclusiva para nutricionistas</div>;
}
```

### Exemplo 6: Loading State

```tsx
"use client";

import { useAuthContext } from "@/contexts/auth-context";

export function UserProfile() {
  const { isLoading, isAuthenticated, user } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div>Você precisa estar autenticado</div>;
  }

  return (
    <div>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}
```

---

## Melhores Práticas

### ✅ Fazer

- Use `useRequireAuth()` para proteger páginas inteiras
- Use `isLoading` para mostrar estados de carregamento
- Use `isNutricionista` e `isPaciente` para renderização condicional
- Trate erros ao usar `login()` e `logout()`

### ❌ Evitar

- Não use o contexto fora do `AuthProvider`
- Não faça múltiplas chamadas de `login()` simultaneamente
- Não ignore o estado `isLoading`

---

## Migração do Hook Anterior

Se você estava usando o hook `useAuth` antigo, aqui está como migrar:

**Antes:**
```tsx
import { useAuth } from "@/lib/hooks/use-auth";

const { session, isLoading, isAuthenticated } = useAuth(true);
```

**Depois:**
```tsx
import { useRequireAuth } from "@/contexts/auth-context";

const { session, isLoading, isAuthenticated, user } = useRequireAuth();
```

---

## Troubleshooting

### Erro: "useAuthContext deve ser usado dentro de um AuthProvider"

**Solução:** Certifique-se de que seu componente está dentro da árvore de componentes que tem o `AuthProvider`. O provider já está configurado no `app/layout.tsx`.

### Loading infinito

**Solução:** Verifique se você está usando `"use client"` no topo do arquivo do componente que usa o contexto.

---

## Suporte

Se tiver dúvidas ou problemas, verifique:

1. A documentação do NextAuth: https://next-auth.js.org
2. Os exemplos neste documento
3. O código fonte em `contexts/auth-context.tsx`
