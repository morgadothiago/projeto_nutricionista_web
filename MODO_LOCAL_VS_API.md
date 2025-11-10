# 🔄 Alternando entre Modo Local e API

Este guia explica como alternar facilmente entre autenticação local (mock) e API externa.

## 🎯 Modos Disponíveis

### 1. **Modo Local (Mock)** 🔧
- Usa credenciais locais para testes
- Não requer API externa
- Perfeito para desenvolvimento
- Usuários de teste pré-configurados

### 2. **Modo API** 🌐
- Conecta à sua API real
- Usado em produção
- Requer backend funcionando

---

## ⚙️ Como Alternar

### Opção 1: Arquivo `.env` (Recomendado)

Edite o arquivo `.env` na raiz do projeto:

**Para usar Modo Local (Mock):**
```env
USE_MOCK_AUTH=true
NEXT_PUBLIC_USE_MOCK_AUTH=true
```

**Para usar API Externa:**
```env
USE_MOCK_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=http://localhost:4000  # Sua URL da API
```

**⚠️ IMPORTANTE:** Após alterar o `.env`, você DEVE reiniciar o servidor Next.js:
```bash
# Pare o servidor (Ctrl+C) e inicie novamente
npm run dev
```

---

## 👥 Usuários de Teste (Modo Local)

Quando `USE_MOCK_AUTH=true`, você pode usar estes usuários:

| Email | Senha | Role |
|-------|-------|------|
| admin@example.com | admin123 | admin |
| user@example.com | user123 | user |
| test@test.com | test123 | user |

### Adicionar Novos Usuários de Teste

Edite o arquivo `lib/auth-mock.ts`:

```typescript
export const MOCK_USERS: MockUser[] = [
  // Usuários existentes...

  // Adicione seu novo usuário aqui:
  {
    id: "4",
    email: "seu@email.com",
    password: "suasenha",
    name: "Seu Nome",
    role: "user",
  },
];
```

---

## 🌐 Configurando a API Externa

### 1. Configure a URL da API

No arquivo `.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
# ou
NEXT_PUBLIC_API_URL=https://api.seusite.com
```

### 2. Formato de Resposta Esperado

Sua API deve retornar os dados do usuário neste formato:

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Sucesso - 200):**
```json
{
  "id": "user-id-123",
  "email": "user@example.com",
  "name": "Nome do Usuário",
  "role": "user"
}
```

**Response (Erro - 401):**
```json
{
  "message": "Credenciais inválidas"
}
```

### 3. Personalize a Integração (Opcional)

Se sua API retorna dados em formato diferente, edite `lib/auth.ts`:

```typescript
// Encontre esta seção no arquivo:
const response = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
  {
    email: credentials.email,
    password: credentials.password,
  }
);

const user = response.data;

// Adapte os dados aqui se necessário:
return {
  id: user.id,              // ou user.userId
  email: user.email,        // ou user.userEmail
  name: user.name,          // ou user.fullName
  role: user.role,          // ou user.userRole
};
```

---

## 🧪 Testando a Conexão com API

### Teste 1: Verificar se a API está respondendo

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

### Teste 2: Ver logs no console

Quando em modo API, o sistema mostra logs no terminal do Next.js:

```
🌐 Usando autenticação via API
```

Quando em modo local:
```
🔧 Usando autenticação MOCK (local)
```

---

## 🐛 Troubleshooting

### Problema: "Credenciais inválidas" no modo API

**Soluções:**
1. Verifique se a API está rodando
2. Confirme a URL no `.env`
3. Teste a API diretamente (curl/Postman)
4. Verifique os logs do servidor Next.js

### Problema: Usuários de teste não aparecem

**Causa:** A página de login só mostra usuários de teste quando `NEXT_PUBLIC_USE_MOCK_AUTH=true`

**Solução:**
1. Verifique o arquivo `.env`
2. Reinicie o servidor Next.js
3. Limpe o cache: `rm -rf .next`

### Problema: Mudei o .env mas nada aconteceu

**Causa:** Variáveis de ambiente são carregadas apenas na inicialização

**Solução:**
1. Pare o servidor (Ctrl+C)
2. Execute novamente: `npm run dev`

---

## 📋 Checklist de Migração

Quando estiver pronto para usar a API:

- [ ] API de autenticação está funcionando
- [ ] Endpoint `/auth/login` está respondendo corretamente
- [ ] Formato de resposta está correto
- [ ] URL da API está configurada no `.env`
- [ ] Mudou `USE_MOCK_AUTH=false` no `.env`
- [ ] Mudou `NEXT_PUBLIC_USE_MOCK_AUTH=false` no `.env`
- [ ] Reiniciou o servidor Next.js
- [ ] Testou o login com credenciais reais

---

## 🔐 Segurança

### ⚠️ IMPORTANTE para Produção:

1. **NUNCA** faça deploy com `USE_MOCK_AUTH=true`
2. **SEMPRE** use HTTPS em produção
3. **NÃO** comite o arquivo `.env` no git (já está no `.gitignore`)
4. Use variáveis de ambiente do seu serviço de hosting (Vercel, Railway, etc.)

### Configurar Variáveis de Ambiente em Produção:

**Vercel:**
```bash
vercel env add USE_MOCK_AUTH
> false

vercel env add NEXT_PUBLIC_API_URL
> https://api.seusite.com
```

**Railway / Render / Outras:**
Adicione as variáveis no dashboard do serviço.

---

## 💡 Dicas

1. **Durante desenvolvimento:** Use modo local para testes rápidos
2. **Antes de fazer deploy:** Teste com a API real localmente
3. **Crie usuários de teste:** Adicione diferentes roles para testar permissões
4. **Documente sua API:** Mantenha a documentação do formato de resposta atualizada

---

## 📚 Arquivos Relacionados

- `lib/auth.ts` - Configuração principal
- `lib/auth-mock.ts` - Usuários de teste
- `app/login/page.tsx` - Página de login
- `.env` - Variáveis de ambiente
- `.env.example` - Exemplo de configuração

---

**Dúvidas?** Consulte o AUTH_README.md para documentação completa!
