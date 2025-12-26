# 📦 Análise de Bundle e Otimizações

## 📊 Status Atual

### Dependências Instaladas: **65 packages**
### Dev Dependencies: **12 packages**

---

## ✅ DEPENDÊNCIAS ESSENCIAIS (Mantém)

### **Framework Core**
- `next` (16.0.1) - Framework principal
- `react` (19.2.0) - Library UI
- `react-dom` (19.2.0) - React DOM

### **UI Components (shadcn/ui + Radix)**
- `@radix-ui/*` (30+ packages) - Primitivos acessíveis
- `lucide-react` - Ícones
- `tailwindcss` + `@tailwindcss/postcss` - Estilização
- `class-variance-authority` - Variantes de classes
- `clsx` + `tailwind-merge` - Utilitários CSS

### **State & Data Fetching**
- `@tanstack/react-query` + devtools - Gerenciamento de estado server (✅ NOVO)
- `axios` - HTTP client

### **Forms & Validation**
- `react-hook-form` - Gerenciamento de formulários
- `@hookform/resolvers` - Resolvers de validação
- `yup` - Esquema de validação (⚠️ DUPLICADO com Zod)
- `zod` - Esquema de validação TypeScript-first

### **Authentication**
- `next-auth` - Autenticação

### **Charts & Visualizations**
- `recharts` - Gráficos (usado em dashboard)

### **UI Enhancements**
- `framer-motion` - Animações (usado em MultiStepForm)
- `sonner` - Toast notifications
- `date-fns` - Manipulação de datas

### **Testing (✅ NOVO)**
- `jest` + `@testing-library/react` - Testes
- `@testing-library/jest-dom` - Matchers de DOM
- `@testing-library/user-event` - Simulação de eventos

### **Monitoring (✅ NOVO)**
- `@sentry/nextjs` - Error tracking

---

## ⚠️ POSSÍVEIS OTIMIZAÇÕES

### 1. **DUPLICAÇÃO: Yup vs Zod**

**Status:** Usando ambos, mas Zod é mais moderno

```json
"yup": "^1.7.1",      // ← 60KB
"zod": "^4.1.12"      // ← 14KB
```

**Recomendação:**
- ✅ Manter `zod` (TypeScript-first, menor, mais rápido)
- ❌ Remover `yup` se não estiver sendo usado

**Como verificar uso:**
```bash
grep -r "import.*yup" app/ components/
```

**Economia estimada:** ~60KB

---

### 2. **Radix UI Components Não Utilizados**

**Status:** 30+ componentes Radix instalados

**Componentes potencialmente não usados:**
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-avatar`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`

**Recomendação:**
- Auditar quais componentes são realmente usados
- Remover os não utilizados

**Como verificar:**
```bash
# Exemplo para accordion
grep -r "@radix-ui/react-accordion" app/ components/
```

**Economia estimada:** ~200-300KB (dependendo de quantos forem removidos)

---

### 3. **Framer Motion - Uso Limitado**

**Status:** 55KB, usado apenas em MultiStepForm

```json
"framer-motion": "^12.23.24"  // ← 55KB
```

**Opções:**
1. ✅ Manter se animações forem importantes para UX
2. ⚠️ Considerar alternativas mais leves (react-spring, CSS animations)
3. ❌ Remover se animations não forem críticas

**Economia potencial:** ~55KB

---

### 4. **Date Manipulation**

**Status:** Duas libraries de data

```json
"date-fns": "^4.1.0",           // ← 17KB (com tree-shaking)
"react-day-picker": "^9.11.1"   // ← Depende de date-fns
```

**Recomendação:** ✅ Manter (bem otimizado com tree-shaking)

---

### 5. **Unused Radix Components**

**Pacotes instalados mas potencialmente não usados:**

```json
"@radix-ui/react-id": "^1.1.1",
"embla-carousel-react": "^8.6.0",
"cmdk": "^1.1.1",
"input-otp": "^1.4.2",
"next-themes": "^0.4.6",
"react-resizable-panels": "^3.0.6",
"vaul": "^1.1.2"
```

**Como auditar:**
```bash
# Criar script para verificar imports
for pkg in cmdk input-otp next-themes react-resizable-panels vaul embla-carousel-react; do
  echo "=== $pkg ==="
  grep -r "from ['\"]$pkg['\"]" app/ components/ || echo "NOT USED"
done
```

---

## 🎯 PLANO DE AÇÃO

### **Alta Prioridade:**

1. ✅ **Remover Yup** (se não usado)
   ```bash
   npm uninstall yup
   ```
   Economia: ~60KB

2. ✅ **Auditar Radix Components**
   ```bash
   # Criar lista de imports realmente usados
   grep -rh "from '@radix-ui" app/ components/ | sort | uniq
   ```

3. ✅ **Verificar pacotes não utilizados**
   ```bash
   npx depcheck
   ```

### **Média Prioridade:**

4. ⚠️ **Considerar alternativa ao Framer Motion**
   - Se animações são simples → CSS animations
   - Se complexas → manter

5. ⚠️ **Lazy loading de componentes pesados**
   ```typescript
   // Exemplo: Charts apenas quando necessário
   const Charts = dynamic(() => import('@/components/charts'), {
     loading: () => <Loader />,
     ssr: false
   })
   ```

---

## 📊 ESTIMATIVA DE OTIMIZAÇÃO

| Ação | Economia Estimada | Esforço |
|------|-------------------|---------|
| Remover Yup | ~60KB | Baixo |
| Remover Radix não usados | ~200-300KB | Médio |
| Lazy load Charts | Melhora TTI | Baixo |
| Code splitting rotas | Melhora FCP | Médio |

**Total potencial:** ~260-360KB de redução

---

## 🔧 FERRAMENTAS ÚTEIS

### **Bundle Analyzer**
```bash
npm install --save-dev @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

```bash
ANALYZE=true npm run build
```

### **Depcheck**
```bash
npx depcheck
```

### **Size Limit**
```bash
npm install --save-dev size-limit @size-limit/preset-next
```

---

## ✅ JÁ OTIMIZADO

- ✅ Next.js 16 com Turbopack (build rápido)
- ✅ React 19 (menor bundle)
- ✅ Tailwind 4 (JIT compiler)
- ✅ TypeScript (tree-shaking)
- ✅ Next/Image (otimização de imagens)
- ✅ Código moderno (ES2020+)

---

## 📝 CONCLUSÃO

O bundle atual está **razoavelmente otimizado**, mas há oportunidades de reduzir **~260-360KB** removendo dependências não utilizadas.

**Recomendação imediata:** Executar `npx depcheck` e remover o que não é usado.
