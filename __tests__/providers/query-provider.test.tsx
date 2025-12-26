/**
 * Tests for QueryProvider
 */

import { render, screen } from "@testing-library/react"
import { QueryProvider } from "@/app/providers/query-provider"

describe("QueryProvider", () => {
  it("deve renderizar children corretamente", () => {
    render(
      <QueryProvider>
        <div>Test Content</div>
      </QueryProvider>
    )

    expect(screen.getByText("Test Content")).toBeInTheDocument()
  })

  it("deve não mostrar DevTools em produção", () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = "production"

    const { container } = render(
      <QueryProvider>
        <div>Test</div>
      </QueryProvider>
    )

    // DevTools não devem estar presentes em produção
    expect(container.querySelector('[data-testid="react-query-devtools"]')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})
