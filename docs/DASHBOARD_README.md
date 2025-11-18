# 📊 Dashboard Nutricionista - Guia Completo

## 🎨 Visão Geral

Dashboard responsivo e moderno para nutricionistas e pacientes com design **mobile-first**, UI/UX profissional e menu dinâmico baseado em roles.

---

## ✨ Características

### 🎯 Design
- ✅ **Mobile First** - Otimizado para smartphones
- ✅ **Responsivo** - Adapta perfeitamente para tablets e desktop
- ✅ **Moderno** - Cores suaves, gradientes e animações
- ✅ **Profissional** - Design limpo e elegante
- ✅ **Acessível** - Interface intuitiva e fácil de usar

### 🔐 Roles e Permissões
- **Nutricionista** - Acesso completo à gestão de pacientes
- **Paciente** - Acesso ao seu acompanhamento pessoal

### 📱 Componentes
- Sidebar responsiva com menu dinâmico
- Header com busca, notificações e perfil
- Cards de estatísticas com tendências
- Cards de atividades recentes
- Ações rápidas
- Layout flexível

---

## 👥 Usuários de Teste

### Nutricionistas

**Dra. Ana Silva**
```
Email: nutricionista@nutri.com
Senha: nutri123
```

**Dr. Carlos Santos**
```
Email: nutri2@nutri.com
Senha: nutri123
```

### Pacientes

**João Oliveira**
```
Email: paciente@email.com
Senha: paciente123
```

**Maria Costa**
```
Email: maria@email.com
Senha: paciente123
```

---

## 📋 Menu por Role

### 🩺 Nutricionista

**Principal**
- Dashboard

**Gestão**
- Pacientes
- Consultas
- Planos Alimentares
- Receitas

**Análises**
- Relatórios
- Estatísticas

**Comunicação**
- Mensagens (badge de notificação)

**Configurações**
- Configurações

### 👤 Paciente

**Principal**
- Dashboard

**Meu Acompanhamento**
- Meu Plano
- Minhas Consultas
- Evolução
- Diário Alimentar

**Saúde**
- Minha Saúde

**Comunicação**
- Mensagens

**Configurações**
- Configurações

---

## 🎨 Paleta de Cores

### Cores Principais
```css
/* Verde Esmeralda (Primary) */
emerald-500: #10b981
emerald-600: #059669

/* Teal (Secondary) */
teal-500: #14b8a6
teal-600: #0d9488

/* Backgrounds */
gray-50: #f9fafb
gray-100: #f3f4f6

/* Text */
gray-900: #111827
gray-700: #374151
```

### Gradientes
```css
/* Primary Gradient */
from-emerald-500 to-teal-600

/* Backgrounds */
from-emerald-50 to-teal-50
```

---

## 📱 Breakpoints Responsivos

```css
/* Mobile First */
Base: 0px - 639px (padrão)

/* Tablet */
sm: 640px - 767px
md: 768px - 1023px

/* Desktop */
lg: 1024px - 1279px
xl: 1280px+
```

### Comportamento por Tela

#### Mobile (< 1024px)
- Sidebar oculta por padrão
- Menu hamburger no header
- Sidebar sobre o conteúdo (overlay)
- Cards empilhados verticalmente
- Busca acessível via ícone

#### Desktop (≥ 1024px)
- Sidebar sempre visível
- Sem overlay
- Layout em grid
- Busca sempre visível
- Mais informações no header

---

## 🛠️ Estrutura de Arquivos

```
nutri_web/
├── types/
│   └── dashboard.ts              # Tipos TypeScript
├── lib/
│   └── menu-config.tsx           # Configuração do menu
├── components/dashboard/
│   ├── sidebar.tsx               # Sidebar responsiva
│   ├── header.tsx                # Header do dashboard
│   ├── dashboard-layout.tsx      # Layout principal
│   ├── stat-card.tsx             # Card de estatística
│   ├── activity-card.tsx         # Card de atividades
│   └── index.ts                  # Exports
└── app/dashboard/
    └── page.tsx                  # Página principal
```

---

## 🎯 Como Usar

### 1. Iniciar o Projeto

```bash
npm run dev
```

### 2. Fazer Login

Acesse: `http://localhost:3000/login`

Escolha um usuário de teste e clique em "Login Rápido"

### 3. Explorar o Dashboard

O dashboard é diferente para cada role:
- **Nutricionistas** veem estatísticas de pacientes
- **Pacientes** veem seu progresso pessoal

---

## 🔧 Personalização

### Adicionar Item no Menu

Edite `lib/menu-config.tsx`:

```typescript
{
  title: "Sua Seção",
  items: [
    {
      label: "Novo Item",
      href: "/dashboard/novo-item",
      icon: SeuIcone,
      roles: ["nutricionista"], // ou ["paciente"] ou ambos
    },
  ],
}
```

### Adicionar Nova Role

1. **Atualize os tipos** em `types/dashboard.ts`:
```typescript
export type UserRole = "nutricionista" | "paciente" | "admin";
```

2. **Adicione usuário mock** em `lib/auth-mock.ts`:
```typescript
{
  id: "5",
  email: "admin@nutri.com",
  password: "admin123",
  name: "Admin",
  role: "admin",
}
```

3. **Configure menu** em `lib/menu-config.tsx`:
```typescript
roles: ["admin"]
```

### Customizar Cores

Edite as classes Tailwind nos componentes:

```tsx
// De:
className="bg-emerald-500"

// Para:
className="bg-blue-500"  // Ou qualquer cor do Tailwind
```

---

## 📊 Componentes Disponíveis

### StatCard

Card de estatística com ícone e tendência:

```tsx
<StatCard
  title="Total de Pacientes"
  value="48"
  icon={Users}
  trend={{ value: "12%", positive: true }}
  iconColor="text-blue-600"
  iconBgColor="bg-blue-100"
/>
```

### ActivityCard

Lista de atividades recentes:

```tsx
<ActivityCard
  activities={[
    {
      id: "1",
      title: "Nova consulta",
      description: "Maria Costa - 15:00",
      time: "Há 5 minutos",
      icon: Calendar,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-100",
    },
  ]}
/>
```

### DashboardLayout

Layout completo com sidebar e header:

```tsx
<DashboardLayout userName={userName} userRole={userRole}>
  {/* Seu conteúdo aqui */}
</DashboardLayout>
```

---

## 🎨 Exemplos de Design

### Card Hover Effect
```tsx
className="hover:shadow-lg transition-shadow duration-300"
```

### Gradient Button
```tsx
className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
```

### Badge
```tsx
<span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
  Nutricionista
</span>
```

---

## 📱 Testes em Diferentes Telas

### Chrome DevTools
1. Abra DevTools (F12)
2. Clique no ícone de dispositivo (Ctrl+Shift+M)
3. Teste em: iPhone, iPad, Desktop

### Tamanhos Recomendados
- Mobile: 375x667 (iPhone SE)
- Tablet: 768x1024 (iPad)
- Desktop: 1920x1080

---

## 🚀 Próximos Passos

### Para Desenvolvimento

1. **Criar páginas faltantes:**
   - `/dashboard/pacientes`
   - `/dashboard/consultas`
   - `/dashboard/planos`
   - etc.

2. **Adicionar funcionalidades:**
   - Busca real no header
   - Notificações funcionais
   - Gráficos e charts
   - Formulários

3. **Integrar com API:**
   - Substituir dados mockados
   - Implementar loading states
   - Tratamento de erros

### Para Produção

1. **Otimizar imagens**
2. **Configurar Analytics**
3. **Testes de performance**
4. **Testes de acessibilidade**
5. **SEO**

---

## 💡 Dicas de UI/UX

### ✅ Boas Práticas

- Use espaçamento consistente (múltiplos de 4px)
- Mantenha hierarquia visual clara
- Use feedback visual (hover, active)
- Tenha loading states para ações
- Mostre mensagens de erro/sucesso
- Use ícones para clareza
- Mantenha consistência de cores

### ❌ Evite

- Muitas cores diferentes
- Textos pequenos demais (< 14px)
- Botões sem feedback
- Ações sem confirmação
- Layouts quebrados em mobile

---

## 🐛 Troubleshooting

### Sidebar não abre no mobile
- Verifique se o botão de menu está chamando `onMenuClick`
- Confirme que `isOpen` está mudando de estado

### Menu não filtra por role
- Verifique se `getMenuForRole()` está sendo chamado
- Confirme que a role do usuário está correta

### Layout quebrado
- Limpe o cache: `rm -rf .next`
- Reinstale dependências: `npm install`
- Rebuild: `npm run build`

---

## 📚 Recursos

- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Next.js](https://nextjs.org)

---

**Dashboard pronto para uso!** 🎉

Execute `npm run dev` e faça login com qualquer usuário de teste!
