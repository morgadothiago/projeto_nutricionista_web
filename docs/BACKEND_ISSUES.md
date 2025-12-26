# 🚨 Problemas Críticos no Backend que Precisam ser Corrigidos

## Resumo
O backend em `https://back-st1k.onrender.com` tem bugs críticos que **impedem o cadastro de novos usuários**. Este documento detalha os problemas encontrados e as soluções necessárias.

---

## ❌ Problema 1: Erro 500 no Registro de Usuários

### Descrição
Ao tentar registrar um novo usuário via `/auth/register`, ocorre erro 500:

```
Failed to create user: Could not find the 'telefone' column of 'usuarios' in the schema cache
```

### Causa Raiz
O DTO de registro (`RegisterDto`) aceita o campo `whatsappNumber`, mas o código do backend tenta mapear para uma coluna `telefone` que:
1. Não existe no schema cache
2. Ou não está configurada corretamente na entidade

### Request que Causa o Erro
```bash
curl -X POST "https://back-st1k.onrender.com/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Teste",
    "email": "teste@example.com",
    "password": "Senha12345",
    "whatsappNumber": "11987654321"
  }'
```

### Resposta do Servidor
```json
{
  "message": "Failed to create user: Could not find the 'telefone' column of 'usuarios' in the schema cache",
  "error": "Internal Server Error",
  "statusCode": 500
}
```

### Solução Necessária no Backend

**Opção 1 - Corrigir o Mapeamento (Recomendado)**
```typescript
// No DTO (RegisterDto)
export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  whatsappNumber: string; // ✅ Campo aceito no DTO
}

// Na Entidade (Usuario.entity.ts)
@Entity('usuarios')
export class Usuario {
  // ... outros campos

  @Column({ name: 'numero_whatsapp' }) // ✅ Mapear corretamente
  whatsappNumber: string;

  // Se precisar de telefone separado
  @Column({ name: 'telefone', nullable: true })
  telefone?: string;
}

// No Service (auth.service.ts)
async register(registerDto: RegisterDto) {
  const user = this.usuarioRepository.create({
    name: registerDto.name,
    email: registerDto.email,
    password: await this.hashPassword(registerDto.password),
    whatsappNumber: registerDto.whatsappNumber, // ✅ Mapeia corretamente
  });

  return await this.usuarioRepository.save(user);
}
```

**Opção 2 - Aceitar Ambos os Campos**
```typescript
export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  whatsappNumber: string;

  @IsString()
  @IsOptional()
  telefone?: string; // Campo opcional
}
```

---

## ❌ Problema 2: Constraint NOT NULL sem Valor Padrão

### Descrição
A tabela `usuarios` tem uma constraint `NOT NULL` na coluna `numero_whatsapp`, mas o DTO não consegue preencher esse campo devido ao Problema 1.

### Erro Relacionado
```
Failed to create user: null value in column "numero_whatsapp" of relation "usuarios" violates not-null constraint
```

### Solução Necessária no Backend

**Opção 1 - Remover NOT NULL (se o campo for opcional)**
```sql
ALTER TABLE usuarios
ALTER COLUMN numero_whatsapp DROP NOT NULL;
```

**Opção 2 - Adicionar Valor Padrão**
```sql
ALTER TABLE usuarios
ALTER COLUMN numero_whatsapp SET DEFAULT '';
```

**Opção 3 - Garantir que o Campo Seja Preenchido**
Corrigir o mapeamento conforme Problema 1.

---

## ❌ Problema 3: Endpoint `/auth/register-doctor` Não Existe

### Descrição
O frontend esperava um endpoint específico para cadastro de nutricionistas, mas ele retorna 404.

### Request
```bash
curl -X POST "https://back-st1k.onrender.com/auth/register-doctor"
```

### Resposta
```json
{
  "message": "Cannot POST /auth/register-doctor",
  "error": "Not Found",
  "statusCode": 404
}
```

### Solução Necessária no Backend

**Opção 1 - Criar o Endpoint (Recomendado para separar lógicas)**
```typescript
// auth.controller.ts
@Post('register-doctor')
async registerDoctor(@Body() registerDoctorDto: RegisterDoctorDto) {
  return this.authService.registerDoctor(registerDoctorDto);
}
```

```typescript
// register-doctor.dto.ts
export class RegisterDoctorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  whatsappNumber: string;

  @IsString()
  crn: string; // CRN do nutricionista

  @IsString()
  especialidade: string;
}
```

**Opção 2 - Usar Campo `role` no Registro Único**
```typescript
export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  whatsappNumber: string;

  @IsEnum(['paciente', 'nutricionista', 'admin'])
  @IsOptional()
  role?: string;

  // Campos opcionais para nutricionista
  @IsString()
  @IsOptional()
  crn?: string;

  @IsString()
  @IsOptional()
  especialidade?: string;
}
```

---

## ❌ Problema 4: Campo `role` Não é Aceito

### Descrição
Quando tentamos enviar o campo `role` no registro, a API retorna erro 400.

### Request
```bash
curl -X POST "https://back-st1k.onrender.com/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@ex.com",
    "password": "Test12345",
    "whatsappNumber": "11999999999",
    "role": "paciente"
  }'
```

### Resposta
```json
{
  "message": ["property role should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
```

### Solução Necessária no Backend

Adicionar o campo `role` ao DTO se for necessário diferenciar tipos de usuário:

```typescript
export class RegisterDto {
  // ... outros campos

  @IsEnum(['paciente', 'nutricionista', 'admin'])
  @IsOptional()
  @ApiProperty({ enum: ['paciente', 'nutricionista', 'admin'], required: false })
  role?: string;
}
```

---

## ❌ Problema 5: Endpoint `/users` Também Quebrado

### Descrição
O endpoint alternativo `/users` (CreateUserDto) também retorna erro 500.

### Request (GET)
```bash
curl -X GET "https://back-st1k.onrender.com/users"
```

### Resposta
```json
{
  "message": "Failed to load users: column usuarios.criado_em does not exist",
  "error": "Internal Server Error",
  "statusCode": 500
}
```

### Solução Necessária no Backend

Corrigir o nome da coluna na entidade ou no banco:

```typescript
@Entity('usuarios')
export class Usuario {
  // Opção 1: Ajustar entidade
  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  // Opção 2: Ou usar o nome que existe no banco
  @CreateDateColumn({ name: 'created_at' }) // se esse for o nome real
  createdAt: Date;
}
```

---

## ✅ Endpoints que Funcionam

### `/auth/login` ✅
```bash
curl -X POST "https://back-st1k.onrender.com/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "senhaCorreta"
  }'
```

**Resposta Esperada:**
```json
{
  "user": {
    "id": "123",
    "email": "usuario@example.com",
    "name": "Nome do Usuário",
    "role": "paciente"
  },
  "access_token": "..."
}
```

---

## 📊 Checklist de Correções Prioritárias

- [ ] **CRÍTICO**: Corrigir mapeamento de `whatsappNumber` → `numero_whatsapp`
- [ ] **CRÍTICO**: Corrigir ou remover constraint NOT NULL de `numero_whatsapp`
- [ ] **CRÍTICO**: Corrigir query que busca coluna `criado_em` (deve ser `created_at` ou vice-versa)
- [ ] **ALTO**: Criar endpoint `/auth/register-doctor` OU aceitar campo `role` no registro
- [ ] **MÉDIO**: Aceitar e salvar campos `crn` e `especialidade` para nutricionistas
- [ ] **MÉDIO**: Documentar schema correto no Swagger (adicionar properties aos DTOs)

---

## 🔧 Como Testar as Correções

Depois de corrigir o backend, teste com:

```bash
# Teste 1: Registro de Paciente
curl -X POST "https://back-st1k.onrender.com/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "Senha12345",
    "whatsappNumber": "11987654321"
  }'

# Teste 2: Registro de Nutricionista (se criar endpoint separado)
curl -X POST "https://back-st1k.onrender.com/auth/register-doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dra. Maria Santos",
    "email": "maria@example.com",
    "password": "Senha12345",
    "whatsappNumber": "11987654321",
    "crn": "CRN-3 12345",
    "especialidade": "Nutrição Esportiva"
  }'

# Teste 3: Login
curl -X POST "https://back-st1k.onrender.com/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "Senha12345"
  }'
```

---

## 📞 Contato para Questões

Se precisar de ajuda para implementar essas correções, entre em contato com o desenvolvedor frontend ou revise a documentação do NestJS sobre:
- TypeORM Column Mapping
- Class Validator DTOs
- NestJS Exception Filters
