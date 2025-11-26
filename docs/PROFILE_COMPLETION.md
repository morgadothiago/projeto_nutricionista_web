# Componente de Progresso de Perfil

Este componente exibe uma barra de progresso dinâmica que indica o quanto do perfil do usuário foi completado.

## Componente: ProfileCompletion

### Importação

```typescript
import { ProfileCompletion, useProfileCompletion } from "@/app/components/profile/profile-completion"
```

## Uso Básico

### Exemplo Simples

```tsx
<ProfileCompletion
  percentage={65}
  label="Complete seu perfil nutricional"
/>
```

### Com Hook de Cálculo Automático

```tsx
"use client"

import { ProfileCompletion, useProfileCompletion } from "@/app/components/profile/profile-completion"

export function MyProfile() {
  const userData = {
    name: "João Silva",
    email: "joao@email.com",
    phone: "11987654321",
    birthDate: "1990-01-01",
    weight: 75,
    height: 175,
    gender: "M",
    // activityLevel: undefined, // Campo faltando
    // goal: undefined, // Campo faltando
  }

  const { percentage, completedFields, totalFields, missingFields } =
    useProfileCompletion(userData)

  return (
    <div>
      <ProfileCompletion
        percentage={percentage}
        label="Complete seu perfil nutricional"
      />

      <p className="text-sm text-gray-600 mt-2">
        {completedFields} de {totalFields} campos preenchidos
      </p>

      {missingFields.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Campos faltando:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

## Props

### ProfileCompletion

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `percentage` | `number` | **obrigatório** | Porcentagem de conclusão (0-100) |
| `label` | `string` | `"Complete seu perfil nutricional"` | Texto descritivo |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamanho do componente |
| `showPercentage` | `boolean` | `true` | Mostrar porcentagem no lado direito |
| `className` | `string` | `undefined` | Classes CSS adicionais |

## Tamanhos

### Small (`sm`)
```tsx
<ProfileCompletion
  percentage={45}
  size="sm"
  label="Perfil"
/>
```

### Medium (`md`) - Padrão
```tsx
<ProfileCompletion
  percentage={65}
  size="md"
  label="Complete seu perfil nutricional"
/>
```

### Large (`lg`)
```tsx
<ProfileCompletion
  percentage={85}
  size="lg"
  label="Complete seu perfil nutricional"
/>
```

## Cores Dinâmicas

O componente muda automaticamente de cor baseado na porcentagem:

- **0-29%**: Vermelho (`bg-red-500`) - Crítico
- **30-69%**: Amarelo (`bg-yellow-500`) - Atenção
- **70-100%**: Verde (`bg-emerald-500`) - Completo

```tsx
<ProfileCompletion percentage={25} /> {/* Vermelho */}
<ProfileCompletion percentage={50} /> {/* Amarelo */}
<ProfileCompletion percentage={90} /> {/* Verde */}
```

## Hook: useProfileCompletion

Calcula automaticamente a porcentagem de conclusão baseado nos dados do usuário.

### Campos Considerados

O hook verifica os seguintes campos:
- `name`
- `email`
- `phone`
- `birthDate`
- `weight`
- `height`
- `gender`
- `activityLevel`
- `goal`

### Retorno

```typescript
{
  percentage: number,           // Porcentagem calculada (0-100)
  completedFields: number,      // Número de campos preenchidos
  totalFields: number,          // Total de campos
  missingFields: string[],      // Array com nomes dos campos faltando
}
```

### Exemplo Completo

```tsx
"use client"

import { ProfileCompletion, useProfileCompletion } from "@/app/components/profile/profile-completion"
import { useSession } from "next-auth/react"

export function ProfileCard() {
  const { data: session } = useSession()

  // Dados do usuário (viriam de uma API)
  const userData = {
    name: session?.user?.name,
    email: session?.user?.email,
    phone: "+55 11 98765-4321",
    birthDate: "1990-05-15",
    weight: 75,
    height: 175,
    gender: "M",
    activityLevel: "moderate",
    goal: "weight_loss",
  }

  const { percentage, completedFields, totalFields, missingFields } =
    useProfileCompletion(userData)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <ProfileCompletion
        percentage={percentage}
        label="Complete seu perfil nutricional"
        size="md"
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {completedFields} de {totalFields} campos preenchidos
        </span>

        {percentage < 100 && (
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            Completar perfil →
          </button>
        )}
      </div>

      {percentage === 100 && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm text-emerald-700 font-medium">
            ✓ Perfil 100% completo!
          </p>
        </div>
      )}
    </div>
  )
}
```

## Exemplos de Uso por Contexto

### No Dashboard do Paciente

```tsx
// app/dashboard/paciente/page.tsx
<div className="mb-8 bg-white rounded-xl border border-gray-200 p-6">
  <ProfileCompletion
    percentage={65}
    label="Complete seu perfil nutricional"
    size="md"
  />
  <p className="mt-2 text-sm text-gray-600">
    Preencha todas as informações para receber recomendações personalizadas
  </p>
</div>
```

### No Dashboard do Nutricionista (Perfil do Paciente)

```tsx
// Mostrando completude do perfil de um paciente
<div className="border-t border-gray-200 pt-4 mt-4">
  <h4 className="text-sm font-medium text-gray-700 mb-3">
    Completude do Perfil
  </h4>
  <ProfileCompletion
    percentage={paciente.profileCompleteness}
    label={`Perfil de ${paciente.name}`}
    size="sm"
    showPercentage={true}
  />
</div>
```

### Sem Label

```tsx
<ProfileCompletion
  percentage={80}
  label=""
  showPercentage={true}
/>
```

### Sem Porcentagem

```tsx
<ProfileCompletion
  percentage={55}
  label="Perfil nutricional"
  showPercentage={false}
/>
```

## Integração com API

### Exemplo com Dados da API

```tsx
"use client"

import { useEffect, useState } from "react"
import { ProfileCompletion } from "@/app/components/profile/profile-completion"

export function UserProfileProgress() {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/user/profile")
        const data = await response.json()
        setProfileData(data)
      } catch (error) {
        console.error("Erro ao carregar perfil:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return <div>Carregando...</div>
  }

  // Calcula porcentagem baseado nos dados da API
  const calculatePercentage = (data: any) => {
    const requiredFields = [
      "name", "email", "phone", "birthDate",
      "weight", "height", "gender", "activityLevel", "goal"
    ]
    const completed = requiredFields.filter(field => data[field]).length
    return Math.round((completed / requiredFields.length) * 100)
  }

  return (
    <ProfileCompletion
      percentage={calculatePercentage(profileData)}
      label="Complete seu perfil nutricional"
    />
  )
}
```

## Estilização Customizada

### Com Classes Personalizadas

```tsx
<ProfileCompletion
  percentage={75}
  className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg"
/>
```

### Variações de Design

#### Card Destacado
```tsx
<div className="bg-white shadow-lg rounded-xl p-6 border-2 border-emerald-200">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-bold text-gray-900">Seu Progresso</h3>
    <span className="text-2xl">📊</span>
  </div>
  <ProfileCompletion
    percentage={85}
    label="Perfil nutricional completo"
    size="lg"
  />
</div>
```

#### Versão Compacta
```tsx
<div className="flex items-center gap-4">
  <span className="text-sm text-gray-600 whitespace-nowrap">Perfil:</span>
  <ProfileCompletion
    percentage={60}
    label=""
    size="sm"
    showPercentage={true}
    className="flex-1"
  />
</div>
```

## Animação

A barra de progresso possui animação suave ao mudar de valor:

```tsx
// A transição é automática
const [progress, setProgress] = useState(30)

// Ao atualizar, a animação ocorre automaticamente
setTimeout(() => setProgress(75), 1000)

<ProfileCompletion percentage={progress} />
```

## Acessibilidade

O componente é acessível por padrão:
- Texto descritivo claro
- Cores com bom contraste
- Animações suaves

## Checklist de Implementação

- [ ] Importar componente
- [ ] Definir fonte de dados (hardcoded, state, API)
- [ ] Configurar porcentagem
- [ ] Escolher tamanho apropriado
- [ ] Adicionar label descritivo
- [ ] (Opcional) Usar hook para cálculo automático
- [ ] (Opcional) Adicionar ação ao clicar (completar perfil)
- [ ] Testar com diferentes valores (0%, 50%, 100%)
