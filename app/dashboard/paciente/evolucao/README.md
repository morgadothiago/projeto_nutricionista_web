# Evolução - Acompanhamento de Hidratação

## Descrição

Página que permite ao paciente acompanhar sua evolução no consumo de água ao longo do dia, registrando o consumo por refeição. Baseada no design fornecido no screenshot.

## Funcionalidades

### 1. Progresso Geral de Água
- **Barra de progresso visual** mostrando consumo vs. meta
- **Contador de litros** consumidos e meta diária
- **Percentual de conclusão** da meta
- Cores em gradiente azul para representar água

### 2. Seletor de Dias da Semana
- Botões para navegar entre os dias (DOM-SAB)
- Dia selecionado destacado em azul
- Permite visualizar histórico e planejar consumo

### 3. Registro por Refeição
Cada refeição mostra:
- **Nome e horário** da refeição
- **Cards expansíveis** para ver detalhes
- **Registros de água** com:
  - Quantidade (ex: "1 copo de água (200ml)")
  - Status: ✓ (consumido) ou ✗ (pendente)
  - Horário do consumo
  - Descrição/observações

### 4. Indicadores Visuais
- **Cores por status**:
  - Azul: água consumida
  - Cinza: pendente/não consumido
- **Ícone de gota d'água** em cada registro
- **Background diferenciado** para itens consumidos

## Estrutura de Dados

```typescript
interface WaterProgress {
  consumed: number  // ml consumidos
  goal: number      // meta em ml
}

interface MealWaterRecord {
  id: string
  name: string        // "Café da manhã", "Almoço", etc.
  time: string        // "07:00", "12:00", etc.
  waterRecords: {
    amount: string         // "1 copo de água (200ml) ✓"
    description: string    // "Consumido às 07:15"
  }[]
  isExpanded: boolean
}
```

## Exemplo de Uso

### Meta Diária
- **Meta**: 2000ml (2L)
- **Consumido**: 1500ml (1.5L)
- **Progresso**: 75%

### Registros por Refeição

**Café da manhã (07:00)**
- ✓ 1 copo de água (200ml) - Consumido às 07:15
- ✓ 1 xícara de chá (150ml) - Consumido às 07:30
- ✗ 1 copo de água (200ml) - Recomendado (pendente)

**Almoço (12:00)**
- ✓ 1 copo antes (200ml) - 11:45
- ✓ 1 copo durante (200ml) - 12:15
- ✓ 1 copo após (200ml) - 12:45
- ✓ 1 suco natural (150ml) - 12:30

**Lanche da Tarde (17:00)**
- ✗ 1 copo de água (200ml) - Pendente
- ✗ 1 xícara de chá (150ml) - Opcional

**Jantar (20:00)**
- ✗ 1 copo antes (200ml) - Recomendado
- ✗ 1 copo durante (200ml) - Recomendado
- ✗ 1 copo após (200ml) - Recomendado

## Acesso

- **Rota**: `/dashboard/paciente/evolucao`
- **Menu**: "Evolução" na seção "Meu Acompanhamento"
- **Permissão**: Apenas para usuários com role "paciente"

## Design

### Cores
- **Verde principal**: `emerald-500` (#10B981) - tema do projeto
- **Verde claro**: `emerald-400` (#34D399)
- **Teal**: `teal-600` (#0D9488) - gradientes
- **Background cards**: Verde claro (`emerald-50`) para consumidos
- **Cinza**: para itens pendentes

### Componentes
- **Barra de progresso**: Gradiente verde (emerald-400 to teal-600) animado
- **Cards expansíveis**: Transição suave
- **Ícone de gota**: `Droplet` do lucide-react
- **Layout responsivo**: max-width 2xl
- **Tema consistente**: Verde emerald em todo o projeto

## Cálculos

### Progresso de Água
```typescript
const progressPercentage = (consumed / goal) * 100
```

### Classificação de Status
- Item com "✓" = Consumido (background azul)
- Item com "✗" = Pendente (background cinza)

## Próximas Melhorias

### 1. Registro Interativo
- Botão para marcar água consumida
- Input para adicionar quantidade personalizada
- Timestamp automático

### 2. Histórico e Estatísticas
- Gráfico de consumo semanal
- Média de hidratação
- Comparação com semanas anteriores

### 3. Notificações
- Lembretes para beber água
- Alerta quando está abaixo da meta
- Parabéns ao atingir a meta

### 4. Gamificação
- Badges por metas consecutivas
- Streak de dias seguindo a meta
- Desafios de hidratação

### 5. Integração
- Sincronizar com apps de saúde
- Ajuste de meta baseado em exercícios
- Recomendações do nutricionista

### 6. Personalização
- Meta personalizada por dia
- Tipos de líquidos diferentes (água, chá, suco)
- Lembretes customizados

## Estrutura de Arquivos

```
app/dashboard/paciente/evolucao/
├── page.tsx          # Componente principal
└── README.md         # Esta documentação
```

## Dependências

- `next`: Framework React
- `next-auth/react`: Autenticação
- `lucide-react`: Ícones (Droplet, ChevronDown, ChevronUp)
- `@/app/components/dashboard/dashboard-layout`: Layout padrão

## Como Testar

1. Faça login como paciente
2. No menu lateral, clique em "Evolução"
3. Veja o progresso geral de água
4. Teste o seletor de dias da semana
5. Clique nos cards de refeições para expandir
6. Observe as diferenças visuais entre consumido/pendente
7. Verifique a barra de progresso

## Notas Técnicas

### Estado da Aplicação
- `selectedDay`: Dia da semana selecionado
- `waterProgress`: Progresso geral do dia
- `meals`: Array de refeições com registros de água
- Cada refeição tem estado `isExpanded` independente

### Performance
- Renderização condicional dos detalhes (só quando expandido)
- Transições CSS suaves
- Cálculo de porcentagem em tempo real

### Acessibilidade
- Contraste adequado de cores
- Botões com áreas clicáveis grandes
- Feedback visual claro de ações
- Texto legível e bem estruturado

## Exemplos de Integração Futura

### API de Registro
```typescript
const registerWater = async (mealId: string, amount: number) => {
  await api.post('/water-records', {
    mealId,
    amount,
    timestamp: new Date()
  })
}
```

### Sincronização em Tempo Real
```typescript
useEffect(() => {
  const fetchWaterData = async () => {
    const data = await api.get(`/water-records/${selectedDay}`)
    setWaterProgress(data.progress)
    setMeals(data.meals)
  }
  fetchWaterData()
}, [selectedDay])
```
