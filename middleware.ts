import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    // Você pode adicionar lógica adicional aqui
    // Por exemplo, verificar roles de usuário
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Retorna true se o usuário estiver autenticado
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Configure quais rotas devem ser protegidas
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (authentication endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - examples (examples page - public)
     * - unauthorized (unauthorized page)
     * - / (home page - public)
     * - public (public files)
     */
    "/dashboard/:path*",
    // Adicione outras rotas protegidas aqui
  ],
};
