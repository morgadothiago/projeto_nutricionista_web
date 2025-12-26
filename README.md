# 🥗 ZapNutre - Plataforma de Nutrição Personalizada

> Sistema completo de gestão nutricional com dashboard para pacientes e nutricionistas

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-Jest-green)](https://jestjs.io/)
[![License](https://img.shields.io/badge/license-Private-red)](LICENSE)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#%EF%B8%8F-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#%EF%B8%8F-configuração)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Build e Deploy](#-build-e-deploy)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Integration](#-api-integration)
- [Documentação](#-documentação)

---

## 🎯 Sobre o Projeto

**ZapNutre** é uma plataforma web moderna para gestão de nutrição personalizada que conecta nutricionistas e pacientes. O sistema permite acompanhamento de refeições, evolução de peso, planos alimentares personalizados e muito mais.

### **Principais Características:**

- 📊 **Dashboards Interativos** - Visualização completa de dados nutricionais
- 🍽️ **Diário Alimentar** - Registro detalhado de refeições
- 📈 **Evolução de Peso** - Gráficos de progresso
- 📋 **Planos Alimentares** - Planos personalizados por nutricionista
- ✅ **Check-ins** - Acompanhamento periódico
- 👥 **Multi-role** - Interface diferenciada para pacientes e nutricionistas
- 🎨 **Design Moderno** - UI/UX profissional e responsiva
- ⚡ **Performance** - React Query para cache inteligente
- 🧪 **Testado** - Jest + Testing Library
- 🛡️ **Seguro** - Error boundaries e Sentry monitoring

---

## ✨ Funcionalidades

### **Para Pacientes:**

- ✅ Visualizar resumo diário de calorias e macros
- ✅ Registrar refeições no diário alimentar
- ✅ Acompanhar evolução de peso com gráficos
- ✅ Visualizar plano alimentar personalizado
- ✅ Realizar check-ins periódicos
- ✅ Configurar perfil e preferências

### **Para Nutricionistas:**

- ✅ Dashboard com estatísticas de pacientes
- ✅ Visualizar lista de pacientes
- ✅ Acompanhar detalhes individuais de cada paciente
- ✅ Relatórios de engajamento
- ✅ Alertas inteligentes de pacientes
- ✅ Criar e editar planos alimentares

---

## 🛠️ Tecnologias

### **Frontend Core:**
- [Next.js 16](https://nextjs.org/) - Framework React com App Router
- [React 19](https://react.dev/) - Library UI
- [TypeScript 5](https://www.typescriptlang.org/) - Type safety

### **Styling:**
- [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes acessíveis
- [Radix UI](https://www.radix-ui.com/) - Primitivos UI
- [Framer Motion](https://www.framer.com/motion/) - Animações

### **State & Data:**
- [TanStack Query](https://tanstack.com/query) - Server state management (✅ NOVO)
- [React Hook Form](https://react-hook-form.com/) - Formulários
- [Zod](https://zod.dev/) - Schema validation

### **Authentication:**
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- JWT - Token-based auth

### **Charts:**
- [Recharts](https://recharts.org/) - Gráficos responsivos

### **HTTP:**
- [Axios](https://axios-http.com/) - HTTP client

### **Testing:** (✅ NOVO)
- [Jest](https://jestjs.io/) - Test runner
- [Testing Library](https://testing-library.com/) - Component testing

### **Monitoring:** (✅ NOVO)
- [Sentry](https://sentry.io/) - Error tracking

---

## 📦 Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Git** >= 2.0.0

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/zapnutre.git
cd zapnutre
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações.

### 4. Execute o projeto

```bash
npm run dev
```

Acesse [http://localhost:3001](http://localhost:3001)

---

## ⚙️ Configuração

### **Variáveis de Ambiente**

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here

# API Backend
NEXT_PUBLIC_API_URL=https://back-st1k.onrender.com

# Sentry (Opcional)
# NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

### **Gerar NEXTAUTH_SECRET**

```bash
openssl rand -base64 32
```

### **Configurar Sentry** (Opcional)

1. Crie conta em [sentry.io](https://sentry.io)
2. Crie novo projeto Next.js
3. Copie o DSN e adicione ao `.env.local`

---

## 💻 Desenvolvimento

### **Comandos Disponíveis**

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento (porta 3001)

# Build
npm run build            # Build de produção
npm run start            # Servidor de produção

# Testes
npm run test             # Executar testes
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Cobertura de testes

# Linting
npm run lint             # ESLint

# Utilitários
npm run check-backend    # Verificar status do backend
```

---

## 🧪 Testes

### **Executar Testes**

```bash
# Todos os testes
npm run test

# Watch mode
npm run test:watch

# Com cobertura
npm run test:coverage
```

### **Estrutura de Testes**

```
__tests__/
├── lib/
│   └── auth.test.ts
├── providers/
│   └── query-provider.test.tsx
└── components/
    └── ...
```

---

## 📦 Build e Deploy

### **Build de Produção**

```bash
npm run build
```

### **Deploy na Vercel**

```bash
npm i -g vercel
vercel
```

Configure as variáveis de ambiente no painel da Vercel.

---

## 📁 Estrutura do Projeto

```
projeto_nutricionista_web/
├── app/                      # Next.js App Router
│   ├── components/           # Componentes do app
│   ├── contexts/             # React Contexts
│   ├── dashboard/            # Dashboards
│   ├── hooks/                # Custom Hooks
│   │   ├── useApi.ts         # Hook legado
│   │   └── useQueries.ts     # React Query hooks (✅ NOVO)
│   ├── providers/            # Providers (✅ NOVO)
│   │   └── query-provider.tsx
│   ├── services/             # API services
│   ├── error.tsx             # Error boundary (✅ NOVO)
│   └── layout.tsx
├── components/ui/            # shadcn/ui components
├── lib/                      # Utilities
├── types/                    # TypeScript types
│   ├── index.ts
│   └── api.ts                # API types (✅ NOVO)
├── __tests__/                # Tests (✅ NOVO)
├── .env.example              # Example env
├── jest.config.js            # Jest config (✅ NOVO)
├── sentry.*.config.ts        # Sentry (✅ NOVO)
├── README.md                 # Este arquivo
├── OTIMIZACOES_APLICADAS.md  # Log de otimizações (✅ NOVO)
├── BACKEND_ISSUES.md         # Bugs do backend
└── BUNDLE_ANALYSIS.md        # Análise de bundle (✅ NOVO)
```

---

## 🔌 API Integration

### **Usando React Query**

```typescript
import { useDailySummary } from "@/app/hooks/useQueries"

function Component() {
  const { data, isLoading, error } = useDailySummary(userId)

  if (isLoading) return <Loader />
  if (error) return <Error />

  return <Display data={data} />
}
```

### **Benefícios do React Query:**

- ✅ Cache automático
- ✅ Refetch em background
- ✅ Deduplicação de requests
- ✅ Retry automático
- ✅ DevTools integrado

### **Endpoints Principais**

- `POST /auth/login` - Login
- `POST /auth/register` - Registro
- `GET /metas-nutricionais/paciente/{id}/resumo-diario` - Resumo diário
- `GET /analytics/dashboard` - Stats nutricionista
- `GET /alimentos` - Refeições
- `POST /alimentos` - Criar refeição

**Ver documentação completa:** [API_ENDPOINTS_STATUS.md](./API_ENDPOINTS_STATUS.md)

---

## 📚 Documentação

### **Documentos Principais:**

- [OTIMIZACOES_APLICADAS.md](./OTIMIZACOES_APLICADAS.md) - ✅ **Log completo de otimizações**
- [BACKEND_ISSUES.md](./BACKEND_ISSUES.md) - ⚠️ **Bugs críticos do backend**
- [BUNDLE_ANALYSIS.md](./BUNDLE_ANALYSIS.md) - 📦 **Análise de dependências**
- [API_ENDPOINTS_STATUS.md](./API_ENDPOINTS_STATUS.md) - 🔌 **Status de integração**

### **Documentos Legados:**

- [README_AUTH.md](./README_AUTH.md) - Guia de autenticação
- [DASHBOARD_README.md](./DASHBOARD_README.md) - Guia do dashboard

---

## 🐛 Problemas Conhecidos

### **Backend Issues**

5 bugs críticos no backend bloqueiam algumas funcionalidades:

1. ❌ Erro 500 no registro de usuários
2. ❌ Campo `numero_whatsapp` com constraint NOT NULL
3. ❌ Endpoint `/auth/register-doctor` não existe
4. ❌ Campo `role` não aceito no DTO
5. ❌ Coluna `criado_em` não existe

**Ver detalhes:** [BACKEND_ISSUES.md](./BACKEND_ISSUES.md)

---

## 📊 Performance

### **Otimizações Aplicadas:**

- ✅ React Query (cache inteligente)
- ✅ Next.js 16 Image optimization
- ✅ Tailwind JIT compiler
- ✅ TypeScript tree-shaking
- ✅ Code splitting automático
- ✅ Error boundaries
- ✅ AbortController (prevent memory leaks)

### **Métricas:**

- Build time: ~10 segundos
- 23 páginas geradas
- 0 erros TypeScript
- Bundle otimizado

---

## 🔒 Segurança

### **Implementado:**

- ✅ JWT com httpOnly cookies
- ✅ CSRF protection
- ✅ Environment variables
- ✅ Input validation (Zod)
- ✅ Role-based access control
- ✅ Error boundaries
- ✅ Sentry monitoring

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit (`git commit -m 'feat: Adiciona MinhaFeature'`)
4. Push (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### **Convenção de Commits:**

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas gerais
```

---

## 📞 Suporte

- **Issues:** [GitHub Issues](https://github.com/seu-usuario/zapnutre/issues)
- **Documentação:** Ver seção [Documentação](#-documentação)

---

## 📄 Licença

Este projeto é privado e proprietário. Todos os direitos reservados.

---

## 👨‍💻 Desenvolvido por

**Equipe ZapNutre**

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Made with ❤️ by ZapNutre Team

</div>
