# 🔌 Guia de Integração com API

## ✅ O que foi feito

### 1. Serviço de API Completo (`app/services/api.ts`)

Criado com todas as funções necessárias:
- ✅ Interceptor de autenticação (adiciona token automaticamente)
- ✅ Funções para Dashboard
- ✅ Funções para Diário Alimentar
- ✅ Funções para Plano Alimentar
- ✅ Funções para Evolução
- ✅ Funções para Check-ins
- ✅ Funções para Configurações
- ✅ Funções para Nutricionista

### 2. Hook Customizado (`app/hooks/useApi.ts`)

Hook que facilita o uso da API:
```typescript
const { data, loading, error, refetch } = useApi<T>(apiFunction)
```

Recursos:
- ✅ Loading state automático
- ✅ Error handling
- ✅ Função refetch para recarregar dados
- ✅ TypeScript support

### 3. Página Home Atualizada

A página Home do paciente já está integrada como exemplo.

---

## 📋 Como Integrar as Outras Páginas

### Padrão de Integração

#### 1. Importar o hook e as funções da API

```typescript
import { useApi } from "@/app/hooks/useApi"
import { getFuncaoDaAPI } from "@/app/services/api"
```

#### 2. Usar o hook no componente

```typescript
const { data, loading, error } = useApi<TipoDeDados>(getFuncaoDaAPI)
```

#### 3. Adicionar states de loading e error

```typescript
{loading ? (
  <Card className="p-12 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-[#2DD49F]" />
  </Card>
) : error ? (
  <Card className="p-6 bg-[#FFF3E0] border-[#FF8C42]">
    <div className="flex items-center gap-3">
      <AlertCircle className="w-6 h-6 text-[#FF8C42]" />
      <p>Erro: {error}</p>
    </div>
  </Card>
) : (
  // Render dos dados
)}
```

#### 4. Fornecer dados padrão caso API não esteja disponível

```typescript
const defaultData = { /* dados padrão */ }
const finalData = data || defaultData
```

---

## 🔧 Páginas para Atualizar

### 1. ❌ Diário Alimentar (`/dashboard/paciente/diario-alimentar/page.tsx`)

**API Functions:**
```typescript
const { data: meals, loading, error } = useApi<any>(getMeals)
```

**Remover:**
- Array `meals` mockado (linhas 56-176)

**Adicionar:**
- Import: `import { getMeals } from "@/app/services/api"`
- Loading state
- Error handling
- Dados padrão: `[]` (array vazio)

---

### 2. ❌ Plano Alimentar (`/dashboard/paciente/plano-alimentar/page.tsx`)

**API Functions:**
```typescript
const { data: weekPlan } = useApi<any>(getMealPlan)
const { data: substitutions } = useApi<any>(getSubstitutions)
const { data: notes } = useApi<any>(getNutritionistNotes)
```

**Remover:**
- Array `weekPlan` mockado (linhas 13-200)
- Array `substitutions` mockado (linhas 202-219)
- String `nutritionistNotes` mockado (linha 221-222)

**Adicionar:**
- Imports da API
- Loading states para cada seção
- Mostrar mensagem "Nenhum plano alimentar cadastrado" quando `!weekPlan || weekPlan.length === 0`

---

### 3. ❌ Evolução (`/dashboard/paciente/evolucao/page.tsx`)

**API Functions:**
```typescript
const [period, setPeriod] = useState("30D")
const { data: weightData, refetch: refetchWeight } = useApi<any>(() => getWeightEvolution(period))
const { data: caloriesData } = useApi<any>(() => getCaloriesEvolution(period))
```

**Remover:**
- Array `weightData` mockado (linhas 13-20)
- Array `caloriesData` mockado (linhas 22-29)
- Constantes mockadas (linhas 31-34)

**Adicionar:**
- Imports da API
- Lógica para recarregar dados quando `period` mudar
- Loading states
- Calcular `initialWeight`, `currentWeight`, `weightLost` a partir do `weightData`

---

### 4. ❌ Check-ins (`/dashboard/paciente/checkins/page.tsx`)

**API Functions:**
```typescript
const { data: checkins, loading, error, refetch } = useApi<any>(getCheckins)
```

**Remover:**
- Array `checkins` mockado (linhas 13-50)

**Adicionar:**
- Import da API
- Loading state
- Error handling
- Botão "Adicionar Check-in" deve chamar `createCheckin()` e depois `refetch()`

---

### 5. ❌ Configurações (`/dashboard/configuracoes/page.tsx`)

**API Functions:**
```typescript
const { data: profile, loading } = useApi<any>(getUserProfile)

// Ao salvar:
const handleSave = async () => {
  await updateUserProfile(formData)
  await updateNotificationSettings(notifications)
}
```

**Remover:**
- Dados mockados de exemplo (defaultValue com valores hardcoded)

**Adicionar:**
- Imports da API
- Loading state
- Pre-preencher campos com `profile?.fieldName`
- Implementar função `handleSave` que chama as APIs de update

---

## 🔐 Importante: Autenticação

O interceptor já foi configurado para adicionar o token automaticamente:

```typescript
// Em app/services/api.ts (já implementado)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

**Certifique-se que o login salva o token:**
```typescript
localStorage.setItem("token", response.data.access_token)
```

---

## 📊 Endpoints da API

### Endpoints Implementados no Backend (funcionando):
- ✅ `POST /auth/login`
- ✅ `POST /auth/register`

### Endpoints Necessários (para implementar no backend):

#### Dashboard
- `GET /dashboard/daily-summary` - Resumo diário (calorias, macros)
- `GET /dashboard/tip-of-day` - Dica do dia

#### Diário Alimentar
- `GET /meals?date=YYYY-MM-DD` - Lista refeições do dia
- `POST /meals` - Cria refeição
- `PUT /meals/:id` - Atualiza refeição
- `DELETE /meals/:id` - Deleta refeição

#### Plano Alimentar
- `GET /meal-plan` - Plano semanal
- `GET /meal-plan/substitutions` - Substituições permitidas
- `GET /meal-plan/notes` - Observações do nutricionista

#### Evolução
- `GET /evolution/weight?period=30D` - Dados de peso
- `GET /evolution/calories?period=30D` - Dados de calorias

#### Check-ins
- `GET /checkins` - Lista check-ins
- `POST /checkins` - Cria check-in
- `PUT /checkins/:id` - Atualiza check-in
- `DELETE /checkins/:id` - Deleta check-in

#### Configurações
- `GET /profile` - Dados do perfil
- `PUT /profile` - Atualiza perfil
- `PUT /profile/notifications` - Atualiza notificações
- `POST /profile/change-password` - Altera senha

---

## 🎯 Próximos Passos

1. ✅ **API Service** - Criado
2. ✅ **useApi Hook** - Criado
3. ✅ **Home Page** - Integrada
4. ❌ **Diário Alimentar** - Aguardando integração
5. ❌ **Plano Alimentar** - Aguardando integração
6. ❌ **Evolução** - Aguardando integração
7. ❌ **Check-ins** - Aguardando integração
8. ❌ **Configurações** - Aguardando integração

### Para cada página:
1. Importar `useApi` e funções da API
2. Substituir dados mockados por `useApi()`
3. Adicionar loading states
4. Adicionar error handling
5. Fornecer dados padrão como fallback
6. Testar

---

## 💡 Exemplo Completo

Veja `app/dashboard/paciente/page.tsx` para um exemplo completo de integração.

---

## 🐛 Troubleshooting

### Erro 401 (Unauthorized)
- Verificar se o token está sendo salvo no localStorage
- Verificar se o interceptor está configurado

### Erro 404 (Not Found)
- Endpoint ainda não implementado no backend
- Usar dados padrão como fallback

### Erro de CORS
- Configurar CORS no backend para aceitar requisições do frontend

---

## 📞 Suporte

Para dúvidas sobre a integração, consulte:
- Arquivo: `app/services/api.ts` - Todas as funções disponíveis
- Arquivo: `app/hooks/useApi.ts` - Como usar o hook
- Arquivo: `app/dashboard/paciente/page.tsx` - Exemplo completo
