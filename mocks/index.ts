/**
 * Exportações centralizadas de todos os dados mockados
 * Use este arquivo para importar dados de teste em qualquer parte do projeto
 */

// Autenticação
export {
  MOCK_USERS,
  TEST_USERS_DISPLAY,
  mockLogin,
  addMockUser,
  listMockUsers,
  type MockUser,
} from "./auth"

// Dashboard
export {
  NUTRICIONISTA_STATS,
  NUTRICIONISTA_ACTIVITIES,
  PACIENTE_STATS,
  PACIENTE_ACTIVITIES,
  type StatCardData,
  type ActivityData,
} from "./dashboard"
