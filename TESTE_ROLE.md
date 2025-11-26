# Guia de Teste - Sistema de Roles

## Mudanças Realizadas

### 1. Corrigido `lib/auth.ts`
- Melhorado parsing da role do usuário para suportar múltiplos formatos
- Suporte para `user.roles` como string JSON ou array
- Suporte para `user.role` como fallback
- Adicionados logs detalhados para debug

### 2. Criado `middleware.ts`
- Arquivo movido de `proxy.ts` para `middleware.ts` (nome correto para Next.js)
- Proteção de rotas do dashboard

### 3. Melhorado `app/dashboard/page.tsx`
- Adicionados logs de debug para verificar a sessão
- Corrigida mensagem de boas-vindas para mostrar o nome do usuário
- Adicionada indicação visual da role atual

## Como Testar

### 1. Verificar Logs no Terminal
Quando você fizer login, procure por estas mensagens no console do servidor:

```
✅ Role extraída no authorize: nutricionista
✅ JWT callback - role salva no token: nutricionista
✅ Session callback - role: nutricionista
```

### 2. Verificar Logs no Browser
Abra o Console do navegador (F12) e procure por:

```
📊 Dashboard - Sessão completa: { user: { ... } }
👤 Dashboard - User role: nutricionista
🔍 Dashboard - É nutricionista? true
```

### 3. Verificar Visualmente
No dashboard, você deve ver:
- "Você está logado como: **nutricionista**" (ou paciente)
- O conteúdo correto baseado na role:
  - **Nutricionista**: Total de Pacientes, Consultas Hoje, etc.
  - **Paciente**: Meta de Peso, Próxima Consulta, etc.

## Possíveis Problemas

### Se a role não aparecer:

1. **Verificar resposta da API**
   - Confirme que o backend está retornando o campo `roles` ou `role`
   - Use ferramentas como Postman para testar o endpoint `/auth/login`

2. **Limpar sessão antiga**
   ```bash
   # No navegador, abra o Console e execute:
   localStorage.clear()
   sessionStorage.clear()
   # Depois faça logout e login novamente
   ```

3. **Reiniciar o servidor Next.js**
   ```bash
   # Pare o servidor (Ctrl+C) e inicie novamente:
   npm run dev
   ```

4. **Verificar variável de ambiente**
   - Confirme que `NEXTAUTH_SECRET` está definida no `.env.local`

## Estrutura de Resposta Esperada da API

O endpoint `/auth/login` deve retornar algo como:

```json
{
  "user": {
    "id": 1,
    "email": "usuario@email.com",
    "name": "Nome do Usuário",
    "roles": "[\"nutricionista\"]"  // OU
    "role": "nutricionista"          // OU
    "roles": ["nutricionista"]       // Todos são suportados
  }
}
```

## Próximos Passos

Se ainda houver problemas:
1. Compartilhe os logs do console do servidor
2. Compartilhe os logs do console do navegador
3. Compartilhe a resposta exata do endpoint `/auth/login`
