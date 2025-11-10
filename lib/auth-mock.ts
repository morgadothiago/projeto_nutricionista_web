/**
 * Serviço de autenticação mock para desenvolvimento local
 * Use este arquivo para testar sem precisar de uma API externa
 */

export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

// Usuários de teste - Adicione mais conforme necessário
export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "nutricionista@nutri.com",
    password: "nutri123",
    name: "Dra. Ana Silva",
    role: "nutricionista",
  },
  {
    id: "2",
    email: "nutri2@nutri.com",
    password: "nutri123",
    name: "Dr. Carlos Santos",
    role: "nutricionista",
  },
  {
    id: "3",
    email: "paciente@email.com",
    password: "paciente123",
    name: "João Oliveira",
    role: "paciente",
  },
  {
    id: "4",
    email: "maria@email.com",
    password: "paciente123",
    name: "Maria Costa",
    role: "paciente",
  },
];

/**
 * Simula uma chamada de API para autenticação
 * @param email - Email do usuário
 * @param password - Senha do usuário
 * @returns Promise com os dados do usuário ou null
 */
export async function mockLogin(
  email: string,
  password: string
): Promise<Omit<MockUser, "password"> | null> {
  // Simula delay de rede (opcional)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Busca o usuário
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return null;
  }

  // Retorna usuário sem a senha
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Adiciona um novo usuário mock (útil para testes)
 */
export function addMockUser(user: MockUser): void {
  MOCK_USERS.push(user);
}

/**
 * Lista todos os usuários mock (sem senhas)
 */
export function listMockUsers(): Omit<MockUser, "password">[] {
  return MOCK_USERS.map(({ password, ...user }) => user);
}
