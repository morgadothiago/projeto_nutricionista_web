# 🔐 Autenticação NextAuth - Guia Rápido

## 🚀 Início Rápido

O projeto está configurado com **autenticação local (mock)** por padrão. Você pode começar a testar imediatamente!

### ⚡ Começar Agora

```bash
# 1. Instale as dependências (se ainda não fez)
npm install

# 2. Inicie o servidor
npm run dev

# 3. Acesse http://localhost:3000/login
```

### 👥 Usuários de Teste

Use qualquer um destes usuários para fazer login:

```
📧 admin@example.com
🔑 admin123
👤 Role: admin

📧 user@example.com
🔑 user123
👤 Role: user

📧 test@test.com
🔑 test123
👤 Role: user
```

**💡 Dica:** Na página de login, você verá uma seção "Usuários de Teste" com botão de login rápido!

---

## 🔄 Dois Modos de Operação

### 1️⃣ Modo Local (Mock) - **ATIVO**
✅ Perfeito para desenvolvimento
✅ Não precisa de API externa
✅ Usuários de teste pré-configurados
✅ Login rápido na interface

### 2️⃣ Modo API
🌐 Conecta à sua API real
🌐 Usado em produção
🌐 Requer backend funcionando

---

## 🔧 Como Trocar para API

Quando sua API estiver pronta:

1. **Abra o arquivo `.env`**

2. **Mude estas linhas:**
```env
USE_MOCK_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=http://localhost:4000  # URL da sua API
```

3. **Reinicie o servidor**
```bash
# Pare (Ctrl+C) e inicie novamente
npm run dev
```

**📖 Detalhes completos:** Veja `MODO_LOCAL_VS_API.md`

---

## 📁 Arquivos Importantes

- **`lib/auth.ts`** - Configuração do NextAuth
- **`lib/auth-mock.ts`** - Usuários de teste (adicione mais aqui)
- **`.env`** - Configurações (troque entre local/API)
- **`app/login/page.tsx`** - Página de login

---

## 🎯 Próximos Passos

### Para Desenvolvimento:
- ✅ Use o modo local (já está ativo)
- ✅ Adicione usuários em `lib/auth-mock.ts`
- ✅ Desenvolva suas features

### Para Produção:
- 📝 Implemente sua API de login
- 📝 Configure `USE_MOCK_AUTH=false`
- 📝 Teste a integração
- 📝 Faça deploy

---

## 📚 Documentação Completa

| Arquivo | Descrição |
|---------|-----------|
| **QUICKSTART.md** | Guia de início rápido |
| **AUTH_README.md** | Documentação completa do NextAuth |
| **MODO_LOCAL_VS_API.md** | Como alternar entre modos |

---

## 🆘 Ajuda Rápida

**Problema:** Não consigo fazer login
**Solução:** Verifique se `USE_MOCK_AUTH=true` no `.env`

**Problema:** Usuários de teste não aparecem
**Solução:** Confirme `NEXT_PUBLIC_USE_MOCK_AUTH=true` e reinicie o servidor

**Problema:** Erro ao conectar na API
**Solução:** Verifique se a API está rodando e a URL está correta

---

## ✨ Features Incluídas

- ✅ Login com email/senha
- ✅ Sessão persistente
- ✅ Proteção de rotas
- ✅ Controle por role (admin/user)
- ✅ Hooks customizados
- ✅ Componentes de proteção
- ✅ Páginas de exemplo

---

**Pronto para começar!** 🎉

Execute `npm run dev` e acesse http://localhost:3000/login
