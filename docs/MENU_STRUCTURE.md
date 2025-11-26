# Estrutura do Menu por Role

Este documento explica como o menu é organizado e exibido de acordo com a role do usuário.

## Como Funciona

O sistema possui um menu dinâmico que exibe itens diferentes baseado na role do usuário autenticado. Isso é gerenciado através do arquivo `lib/menu-config.tsx`.

## Estrutura de Configuração

### Arquivo: `lib/menu-config.tsx`

```typescript
export const MENU_CONFIG: MenuSection[] = [
  {
    title: "Principal",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard/nutricionista",
        icon: LayoutDashboard,
        roles: ["nutricionista"], // ← Define quem pode ver
      },
      {
        label: "Dashboard",
        href: "/dashboard/paciente",
        icon: LayoutDashboard,
        roles: ["paciente"], // ← Define quem pode ver
      },
    ],
  },
  // ... mais seções
]
```

## Menu por Role

### 👨‍⚕️ Nutricionista

**Itens visíveis:**

#### Principal
- Dashboard → `/dashboard/nutricionista`

#### Gestão
- Pacientes → `/dashboard/pacientes`
- Consultas → `/dashboard/consultas`
- Planos Alimentares → `/dashboard/planos`
- Receitas → `/dashboard/receitas`

#### Análises
- Relatórios → `/dashboard/relatorios`
- Estatísticas → `/dashboard/estatisticas`

#### Comunicação
- Mensagens → `/dashboard/mensagens`

#### Configurações
- Configurações → `/dashboard/configuracoes`

---

### 👤 Paciente

**Itens visíveis:**

#### Principal
- Dashboard → `/dashboard/paciente`

#### Meu Acompanhamento
- Meu Plano → `/dashboard/meu-plano`
- Minhas Consultas → `/dashboard/minhas-consultas`
- Evolução → `/dashboard/evolucao`
- Diário Alimentar → `/dashboard/diario`

#### Comunicação
- Mensagens → `/dashboard/mensagens`

#### Saúde
- Minha Saúde → `/dashboard/saude`

#### Configurações
- Configurações → `/dashboard/configuracoes`

---

## Função de Filtragem

A função `getMenuForRole()` filtra automaticamente os itens do menu:

```typescript
export function getMenuForRole(userRole: string): MenuSection[] {
  return MENU_CONFIG.map((section) => ({
    ...section,
    items: section.items.filter((item) =>
      item.roles.includes(userRole as "nutricionista" | "paciente")
    ),
  })).filter((section) => section.items.length > 0)
}
```

**Processo:**
1. Percorre todas as seções do menu
2. Filtra itens que incluem a role do usuário
3. Remove seções vazias (sem itens visíveis)
4. Retorna apenas o que o usuário pode ver

## Como o Sidebar Usa

```typescript
// app/components/dashboard/sidebar.tsx
export function Sidebar({ userRole, isOpen, onClose }: SidebarProps) {
  const menuSections = getMenuForRole(userRole)
  const dashboardUrl = userRole === "nutricionista"
    ? "/dashboard/nutricionista"
    : "/dashboard/paciente"

  return (
    // ... renderiza menuSections filtrados
  )
}
```

## Adicionar Novos Itens ao Menu

### 1. Definir o item em `lib/menu-config.tsx`

```typescript
{
  title: "Nova Seção",
  items: [
    {
      label: "Novo Item",
      href: "/dashboard/novo-item",
      icon: IconeDoLucide,
      roles: ["nutricionista"], // ou ["paciente"] ou ["nutricionista", "paciente"]
    },
  ],
}
```

### 2. Escolher o ícone

Importar do `lucide-react`:
```typescript
import { IconeDoLucide } from "lucide-react"
```

Ícones disponíveis: https://lucide.dev/icons

### 3. Adicionar badge (opcional)

```typescript
{
  label: "Mensagens",
  href: "/dashboard/mensagens",
  icon: MessageSquare,
  roles: ["nutricionista", "paciente"],
  badge: 3, // ← Exibe número em vermelho
}
```

### 4. Criar a página correspondente

```
app/
└── dashboard/
    └── novo-item/
        └── page.tsx
```

## Exemplos de Uso

### Item visível para ambas as roles

```typescript
{
  label: "Configurações",
  href: "/dashboard/configuracoes",
  icon: Settings,
  roles: ["nutricionista", "paciente"], // ← Ambos veem
}
```

### Item visível apenas para nutricionistas

```typescript
{
  label: "Pacientes",
  href: "/dashboard/pacientes",
  icon: Users,
  roles: ["nutricionista"], // ← Apenas nutricionistas
}
```

### Item visível apenas para pacientes

```typescript
{
  label: "Minha Saúde",
  href: "/dashboard/saude",
  icon: Heart,
  roles: ["paciente"], // ← Apenas pacientes
}
```

## Comportamento Dinâmico

### Seções Vazias são Removidas

Se uma seção não tem nenhum item visível para a role, a seção inteira não aparece:

```typescript
// Configuração
{
  title: "Gestão", // Apenas para nutricionistas
  items: [
    { ..., roles: ["nutricionista"] },
    { ..., roles: ["nutricionista"] },
  ]
}

// Resultado para PACIENTE: seção "Gestão" não aparece
// Resultado para NUTRICIONISTA: seção "Gestão" aparece com todos os itens
```

### Link do Logo

O logo no topo do sidebar também se adapta à role:

```typescript
const dashboardUrl = userRole === "nutricionista"
  ? "/dashboard/nutricionista"
  : "/dashboard/paciente"

<Link href={dashboardUrl}>
  <Logo />
</Link>
```

## Indicador de Role

No rodapé do sidebar, mostra a role atual:

```typescript
<div className="p-4 border-t border-gray-200">
  <div className="px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
    <p className="text-xs font-medium text-gray-600">Você está como:</p>
    <p className="text-sm font-bold text-emerald-700 capitalize">
      {userRole}
    </p>
  </div>
</div>
```

## Checklist para Adicionar Nova Funcionalidade

- [ ] Definir rota em `app/dashboard/[nome]/page.tsx`
- [ ] Adicionar item em `lib/menu-config.tsx`
- [ ] Escolher ícone apropriado do Lucide
- [ ] Definir roles que podem acessar
- [ ] Testar com ambas as roles
- [ ] Verificar se a rota está protegida (useEffect com verificação de role)

## Estrutura Visual

```
┌─────────────────────────────┐
│  Logo (link dinâmico)       │
├─────────────────────────────┤
│                             │
│  Principal                  │  ← Seção
│  • Dashboard                │  ← Item
│                             │
│  Gestão (nutricionista)     │  ← Seção (condicional)
│  • Pacientes                │  ← Item
│  • Consultas                │  ← Item
│  • Planos Alimentares       │  ← Item
│  • Receitas                 │  ← Item
│                             │
│  Meu Acompanhamento (pac.)  │  ← Seção (condicional)
│  • Meu Plano                │  ← Item
│  • Minhas Consultas         │  ← Item
│  • Evolução                 │  ← Item
│  • Diário Alimentar         │  ← Item
│                             │
│  Comunicação                │  ← Seção
│  • Mensagens [3]            │  ← Item com badge
│                             │
│  Configurações              │  ← Seção
│  • Configurações            │  ← Item
│                             │
├─────────────────────────────┤
│  Você está como:            │
│  Nutricionista              │  ← Indicador de role
└─────────────────────────────┘
```

## Debugging

Para ver qual menu está sendo exibido para cada role:

```typescript
// Adicione no Sidebar
console.log('User Role:', userRole)
console.log('Menu Sections:', menuSections)
```

Isso ajuda a verificar se a filtragem está funcionando corretamente.
