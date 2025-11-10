# 🥗 NutriWeb - Sistema de Gestão para Nutricionistas

Sistema completo de gestão nutricional com autenticação NextAuth, dashboard responsivo e menu dinâmico baseado em roles.

## ✨ Características

- 🔐 **Autenticação completa** com NextAuth (Credentials Provider)
- 📊 **Dashboard responsivo** mobile-first
- 👥 **Roles**: Nutricionista e Paciente
- 🎨 **UI/UX moderna** e profissional
- 📱 **100% responsivo** (mobile, tablet, desktop)
- 🔄 **Menu dinâmico** baseado em permissões
- 🧪 **Modo de teste** com usuários mockados

---

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 2. Iniciar o Servidor

```bash
npm run dev
# ou
yarn dev
```

### 3. Acessar a Aplicação

```
http://localhost:3000
```

### 4. Fazer Login

Acesse `/login` e escolha um usuário de teste:

**Nutricionistas:**
- `nutricionista@nutri.com` / `nutri123`
- `nutri2@nutri.com` / `nutri123`

**Pacientes:**
- `paciente@email.com` / `paciente123`
- `maria@email.com` / `paciente123`

---

## 📁 Estrutura do Projeto

```
nutri_web/
├── app/                          # App Router do Next.js
│   ├── dashboard/               # Dashboard principal
│   ├── login/                   # Página de login
│   ├── api/auth/                # API do NextAuth
│   └── layout.tsx               # Layout raiz
├── components/
│   ├── dashboard/               # Componentes do dashboard
│   │   ├── sidebar.tsx          # Sidebar responsiva
│   │   ├── header.tsx           # Header
│   │   ├── dashboard-layout.tsx # Layout
│   │   ├── stat-card.tsx        # Cards estatísticas
│   │   └── activity-card.tsx    # Cards atividades
│   ├── auth/                    # Componentes de auth
│   └── providers/               # Providers React
├── lib/
│   ├── auth.ts                  # Config NextAuth
│   ├── auth-mock.ts             # Usuários de teste
│   └── menu-config.tsx          # Configuração do menu
├── types/                        # Tipos TypeScript
└── middleware.ts                # Middleware de proteção
```

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| **[README_AUTH.md](./README_AUTH.md)** ⭐ | Guia de autenticação - **COMECE AQUI!** |
| **[DASHBOARD_README.md](./DASHBOARD_README.md)** | Guia completo do dashboard |
| **[QUICKSTART.md](./QUICKSTART.md)** | Início rápido |
| **[AUTH_README.md](./AUTH_README.md)** | Documentação completa de auth |
| **[MODO_LOCAL_VS_API.md](./MODO_LOCAL_VS_API.md)** | Como trocar entre local e API |

---

## 🎨 Dashboard

### Nutricionista
- 📊 Estatísticas de pacientes
- 📅 Gestão de consultas
- 🍎 Planos alimentares
- 📈 Relatórios e análises

### Paciente
- 🎯 Acompanhamento de metas
- 🍽️ Diário alimentar
- 📊 Evolução de peso
- 💬 Mensagens com nutricionista

---

## 🔧 Tecnologias

- **Framework:** Next.js 16 (App Router)
- **Autenticação:** NextAuth.js 4
- **Estilização:** Tailwind CSS 4
- **Ícones:** Lucide React
- **Linguagem:** TypeScript 5
- **HTTP Client:** Axios

---

## 🔐 Sistema de Autenticação

### Modo Atual: Local (Mock)

O projeto está configurado para usar autenticação local por padrão, perfeito para desenvolvimento!

**Para trocar para API:**
```env
# .env
USE_MOCK_AUTH=false
NEXT_PUBLIC_USE_MOCK_AUTH=false
NEXT_PUBLIC_API_URL=http://sua-api.com
```

Veja [MODO_LOCAL_VS_API.md](./MODO_LOCAL_VS_API.md) para mais detalhes.

---

## 📱 Design Responsivo

### Mobile (< 1024px)
- ✅ Sidebar com overlay
- ✅ Menu hamburger
- ✅ Cards empilhados
- ✅ Touch-friendly

### Desktop (≥ 1024px)
- ✅ Sidebar fixa
- ✅ Layout em grid
- ✅ Busca sempre visível
- ✅ Mais informações

---

## 🎯 Menu Dinâmico por Role

O menu muda automaticamente baseado na role do usuário:

### Nutricionista vê:
- Dashboard
- Pacientes
- Consultas
- Planos Alimentares
- Receitas
- Relatórios
- Estatísticas
- Mensagens
- Configurações

### Paciente vê:
- Dashboard
- Meu Plano
- Minhas Consultas
- Evolução
- Diário Alimentar
- Minha Saúde
- Mensagens
- Configurações

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint
```

---

## 🎨 Cores do Tema

```css
/* Verde Esmeralda - Primary */
#10b981 (emerald-500)
#059669 (emerald-600)

/* Teal - Secondary */
#14b8a6 (teal-500)
#0d9488 (teal-600)

/* Backgrounds */
#f9fafb (gray-50)
#ffffff (white)

/* Text */
#111827 (gray-900)
#374151 (gray-700)
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Configure as variáveis de ambiente:**
- `NEXTAUTH_URL` - URL da aplicação
- `NEXTAUTH_SECRET` - Secret do NextAuth
- `USE_MOCK_AUTH=false` - Desabilitar mock em produção
- `NEXT_PUBLIC_API_URL` - URL da sua API

---

## 🔄 Adicionar Nova Role

1. **Atualize tipos** (`types/dashboard.ts`):
```typescript
export type UserRole = "nutricionista" | "paciente" | "admin";
```

2. **Adicione usuário mock** (`lib/auth-mock.ts`):
```typescript
{
  id: "5",
  email: "admin@nutri.com",
  password: "admin123",
  name: "Admin",
  role: "admin",
}
```

3. **Configure menu** (`lib/menu-config.tsx`):
```typescript
{
  label: "Painel Admin",
  href: "/dashboard/admin",
  icon: Shield,
  roles: ["admin"],
}
```

---

## 📝 Próximas Features

- [ ] Gráficos de evolução com Chart.js
- [ ] Sistema de mensagens real-time
- [ ] Upload de imagens e documentos
- [ ] Geração de PDFs (relatórios)
- [ ] Notificações push
- [ ] Integração com Google Calendar
- [ ] Multi-idioma (i18n)
- [ ] Modo escuro
- [ ] App mobile (React Native)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 🐛 Troubleshooting

### Erro ao fazer login
```bash
# Verifique se está em modo mock
USE_MOCK_AUTH=true no .env

# Reinicie o servidor
npm run dev
```

### Sidebar não abre
```bash
# Limpe o cache
rm -rf .next

# Rebuild
npm run build
```

### Menu não mostra itens
```bash
# Verifique a role do usuário
console.log(session.user?.role)

# Verifique menu-config.tsx
```

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 🆘 Suporte

**Problemas?** Consulte a documentação:
- [README_AUTH.md](./README_AUTH.md) - Problemas de autenticação
- [DASHBOARD_README.md](./DASHBOARD_README.md) - Problemas no dashboard
- [Issues](https://github.com/seu-usuario/nutri_web/issues) - Abra uma issue

---

## ⭐ Créditos

Desenvolvido com:
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

---

**Pronto para começar!** 🚀

Execute `npm run dev` e acesse http://localhost:3000

**Primeira vez?** Leia [README_AUTH.md](./README_AUTH.md) para começar!
