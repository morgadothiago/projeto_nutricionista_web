# Estrutura de Páginas do Dashboard

Este documento lista todas as páginas criadas no dashboard, organizadas por role.

## 📱 Páginas do Paciente

Todas as páginas específicas para pacientes com proteção de rota.

### Meu Acompanhamento

| Página | URL | Descrição | Status |
|--------|-----|-----------|--------|
| **Meu Plano** | `/dashboard/meu-plano` | Visualização do plano alimentar do paciente | ✅ Criada |
| **Minhas Consultas** | `/dashboard/minhas-consultas` | Histórico e agendamento de consultas | ✅ Criada |
| **Evolução** | `/dashboard/evolucao` | Gráficos e métricas de progresso | ✅ Criada |
| **Diário Alimentar** | `/dashboard/diario` | Registro diário de alimentação | ✅ Criada |

### Saúde

| Página | URL | Descrição | Status |
|--------|-----|-----------|--------|
| **Minha Saúde** | `/dashboard/saude` | Indicadores de saúde e bem-estar | ✅ Criada |

---

## 👨‍⚕️ Páginas do Nutricionista

Todas as páginas específicas para nutricionistas com proteção de rota.

### Gestão

| Página | URL | Descrição | Status |
|--------|-----|-----------|--------|
| **Pacientes** | `/dashboard/pacientes` | Lista e gerenciamento de pacientes | ✅ Criada |
| **Consultas** | `/dashboard/consultas` | Agenda e histórico de consultas | ✅ Criada |
| **Planos Alimentares** | `/dashboard/planos` | Criação e gestão de planos | ✅ Criada |
| **Receitas** | `/dashboard/receitas` | Banco de receitas nutricionais | ✅ Criada |

### Análises

| Página | URL | Descrição | Status |
|--------|-----|-----------|--------|
| **Relatórios** | `/dashboard/relatorios` | Relatórios de pacientes e consultas | ✅ Criada |
| **Estatísticas** | `/dashboard/estatisticas` | Métricas e análises gerais | ✅ Criada |

---

## 🔄 Páginas Compartilhadas

Páginas acessíveis tanto para pacientes quanto nutricionistas.

| Página | URL | Descrição | Acesso | Status |
|--------|-----|-----------|--------|--------|
| **Mensagens** | `/dashboard/mensagens` | Sistema de mensagens | Todos | ✅ Criada |
| **Configurações** | `/dashboard/configuracoes` | Configurações da conta | Todos | ✅ Criada |

---

## 🏠 Dashboards Principais

| Página | URL | Descrição | Acesso | Status |
|--------|-----|-----------|--------|--------|
| **Dashboard Nutricionista** | `/dashboard/nutricionista` | Dashboard principal do nutricionista | Nutricionista | ✅ Criada |
| **Dashboard Paciente** | `/dashboard/paciente` | Dashboard principal do paciente | Paciente | ✅ Criada |
| **Dashboard Genérico** | `/dashboard` | Redireciona baseado na role | Todos | ✅ Existe |

---

## 🔒 Proteção de Rotas

Todas as páginas possuem proteção implementada:

### Verificação de Autenticação
```typescript
useEffect(() => {
  if (status === "loading") return
  if (!session) {
    router.push("/login")
  }
}, [session, status, router])
```

### Verificação de Role (Páginas Específicas)

**Para Pacientes:**
```typescript
if (session.user?.role !== "paciente") {
  router.push("/dashboard/nutricionista")
}
```

**Para Nutricionistas:**
```typescript
if (session.user?.role !== "nutricionista") {
  router.push("/dashboard/paciente")
}
```

---

## 📊 Resumo de Páginas

### Total por Categoria

- **Paciente**: 5 páginas exclusivas
- **Nutricionista**: 6 páginas exclusivas
- **Compartilhadas**: 2 páginas
- **Dashboards**: 3 páginas
- **TOTAL**: 16 páginas criadas

### Todas com:
- ✅ Proteção de autenticação
- ✅ Verificação de role
- ✅ Layout responsivo (DashboardLayout)
- ✅ Loading state
- ✅ "Hello World" placeholder

---

## 🗂️ Estrutura de Diretórios

```
app/dashboard/
├── nutricionista/
│   └── page.tsx                 # Dashboard principal (nutricionista)
├── paciente/
│   └── page.tsx                 # Dashboard principal (paciente)
├── page.tsx                     # Dashboard genérico (redireciona)
│
├── meu-plano/
│   └── page.tsx                 # [Paciente] Meu plano alimentar
├── minhas-consultas/
│   └── page.tsx                 # [Paciente] Minhas consultas
├── evolucao/
│   └── page.tsx                 # [Paciente] Evolução
├── diario/
│   └── page.tsx                 # [Paciente] Diário alimentar
├── saude/
│   └── page.tsx                 # [Paciente] Minha saúde
│
├── pacientes/
│   └── page.tsx                 # [Nutricionista] Gestão de pacientes
├── consultas/
│   └── page.tsx                 # [Nutricionista] Gestão de consultas
├── planos/
│   └── page.tsx                 # [Nutricionista] Planos alimentares
├── receitas/
│   └── page.tsx                 # [Nutricionista] Receitas
├── relatorios/
│   └── page.tsx                 # [Nutricionista] Relatórios
├── estatisticas/
│   └── page.tsx                 # [Nutricionista] Estatísticas
│
├── mensagens/
│   └── page.tsx                 # [Todos] Mensagens
└── configuracoes/
    └── page.tsx                 # [Todos] Configurações
```

---

## 🚀 Como Testar

### Como Paciente

1. Faça login com um usuário paciente
2. Você verá no menu lateral:
   - Dashboard
   - Meu Plano
   - Minhas Consultas
   - Evolução
   - Diário Alimentar
   - Mensagens
   - Minha Saúde
   - Configurações

3. Clique em qualquer item para ver "Hello World - [Nome da Página]"

### Como Nutricionista

1. Faça login com um usuário nutricionista
2. Você verá no menu lateral:
   - Dashboard
   - Pacientes
   - Consultas
   - Planos Alimentares
   - Receitas
   - Relatórios
   - Estatísticas
   - Mensagens
   - Configurações

3. Clique em qualquer item para ver "Hello World - [Nome da Página]"

---

## 🔄 Próximos Passos

Para cada página, você pode agora:

1. **Substituir "Hello World"** pelo conteúdo real
2. **Adicionar componentes específicos** (tabelas, formulários, gráficos)
3. **Integrar com API** para buscar dados reais
4. **Adicionar funcionalidades** (CRUD, filtros, pesquisa)

### Exemplo de Implementação

```typescript
// Substituir isto:
<div className="flex items-center justify-center min-h-[60vh]">
  <h1 className="text-4xl font-bold text-gray-900">Hello World - Pacientes</h1>
</div>

// Por isto:
<div>
  <h1 className="text-2xl font-bold text-gray-900 mb-6">Meus Pacientes</h1>
  <PatientsTable patients={patients} />
</div>
```

---

## ✅ Checklist de Desenvolvimento

Para cada página, siga este checklist:

- [ ] Design da interface (wireframe/mockup)
- [ ] Componentes necessários
- [ ] Integração com API
- [ ] Estados de loading
- [ ] Tratamento de erros
- [ ] Validação de dados
- [ ] Testes
- [ ] Responsividade
- [ ] Acessibilidade

---

## 📝 Notas

- Todas as páginas usam `DashboardLayout` para consistência
- O menu lateral é filtrado automaticamente por role
- Loading states estão implementados em todas as páginas
- Redirecionamentos estão protegidos contra loops infinitos
