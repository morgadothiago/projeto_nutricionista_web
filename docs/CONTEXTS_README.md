# Contextos do Projeto

Este diretório contém os contextos React do projeto Zap Nutre.

## 📁 Estrutura

```
contexts/
└── auth-context.tsx    # Contexto de autenticação
```

## 🔐 AuthContext

O AuthContext é o contexto principal de autenticação da aplicação.

### Recursos

- ✅ Integração completa com NextAuth
- ✅ Estado global de autenticação
- ✅ Informações do usuário facilmente acessíveis
- ✅ Métodos simplificados de login/logout
- ✅ Verificação de roles (nutricionista/paciente)
- ✅ Proteção automática de componentes
- ✅ Hooks customizados para casos de uso comuns

### Hooks Exportados

1. **`useAuthContext()`** - Hook principal
2. **`useRequireAuth(options?)`** - Protege componentes
3. **`useRequireNutricionista()`** - Requer role de nutricionista
4. **`useRequirePaciente()`** - Requer role de paciente

### Documentação Completa

Para documentação detalhada e exemplos de uso, consulte:
- [`docs/AUTH_CONTEXT_USAGE.md`](../docs/AUTH_CONTEXT_USAGE.md)
- [`app/examples/auth-example.tsx`](../app/examples/auth-example.tsx)

## 🚀 Início Rápido

```tsx
import { useAuthContext } from "@/contexts/auth-context";

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuthContext();

  if (!isAuthenticated) {
    return <div>Por favor, faça login</div>;
  }

  return (
    <div>
      <p>Olá, {user?.name}!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## 📚 Recursos Adicionais

- [NextAuth Documentation](https://next-auth.js.org)
- [React Context API](https://react.dev/reference/react/useContext)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)
