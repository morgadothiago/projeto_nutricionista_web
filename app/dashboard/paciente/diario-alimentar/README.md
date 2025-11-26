# Diário Alimentar - Plano Alimentar do Paciente

## Descrição

Página que exibe o plano alimentar do paciente com todas as refeições do dia organizadas por horário. Baseada no design fornecido no screenshot.

## Funcionalidades

### 1. Seletor de Dias da Semana
- Botões para selecionar cada dia (DOM, SEG, TER, QUA, QUI, SEX, SAB)
- Dia selecionado destacado em verde
- Layout responsivo

### 2. Cards de Refeições
Cada refeição inclui:
- **Nome da refeição** (ex: "Café da manhã", "Almoço", etc.)
- **Horário** (ex: "07:00", "12:00")
- **Estado expansível** - clique para expandir/recolher
- **Conteúdo detalhado** quando expandido:
  - Categorias de alimentos (ex: "Fonte de proteína", "Carboidrato")
  - Lista de opções de alimentos para escolher
  - Formatação clara com bullets

### 3. Interface
- **Header**: Logo verde com coração + título "Plano Alimentar"
- **Descrição**: Texto explicativo sobre o plano
- **Botão Voltar**: Retorna à página anterior

## Estrutura de Dados

```typescript
interface Meal {
  id: string
  name: string
  time: string
  items: {
    category: string
    foods: string[]
  }[]
  isExpanded: boolean
}
```

## Exemplo de Uso

A página já vem com dados de exemplo pré-carregados:

1. **Café da manhã (07:00)**
   - Fonte de proteína: ovos, queijo ou iogurte
   - Carboidrato: pão integral

2. **Almoço (12:00)**
   - Fonte de proteína: frango, ovos, peixe ou grão de bico

3. **Lanche da Tarde (17:00)**
   - Fonte de proteína: iogurte ou ovos
   - Carboidrato: frutas de baixo índice glicêmico

4. **Jantar (20:00)**
   - Fonte de proteína: frango, peixe, carne ou leguminosas

## Acesso

- **Rota**: `/dashboard/paciente/diario-alimentar`
- **Menu**: "Diário Alimentar" na seção "Meu Acompanhamento"
- **Permissão**: Apenas para usuários com role "paciente"

## Design

### Cores
- **Verde principal**: `emerald-500` (#10B981)
- **Verde escuro**: `teal-600` (#0D9488)
- **Background**: Branco com cards com sombra sutil
- **Texto**: Cinza em vários tons para hierarquia

### Componentes
- Cards com borda arredondada (`rounded-xl`)
- Ícones de chevron para indicar estado expandido/recolhido
- Transições suaves em hover e cliques
- Layout responsivo com max-width de 2xl

## Próximas Melhorias Possíveis

1. **Integração com API**
   - Buscar dados reais do plano alimentar do paciente
   - Salvar refeições consumidas

2. **Marcação de Refeições**
   - Checkbox para marcar alimentos consumidos
   - Histórico de consumo diário

3. **Filtros e Buscas**
   - Buscar por tipo de alimento
   - Filtrar por categoria nutricional

4. **Notificações**
   - Lembretes de horários das refeições
   - Avisos de meta de água

5. **Exportação**
   - PDF do plano alimentar
   - Compartilhamento via WhatsApp

## Estrutura de Arquivos

```
app/dashboard/paciente/diario-alimentar/
├── page.tsx          # Componente principal da página
└── README.md         # Esta documentação
```

## Dependências

- `next`: Framework React
- `next-auth/react`: Autenticação e sessão
- `lucide-react`: Ícones (ChevronDown, ChevronUp)
- `@/app/components/dashboard/dashboard-layout`: Layout padrão do dashboard

## Como Testar

1. Faça login como paciente
2. No menu lateral, clique em "Diário Alimentar"
3. Teste os seletores de dias da semana
4. Clique nos cards de refeições para expandir/recolher
5. Clique no botão "Voltar" para retornar
