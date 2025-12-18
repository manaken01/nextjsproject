import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NavBar from '../NavBar'

describe('NavBar', () => {
  it('renderiza el título correctamente', () => {
    render(<NavBar />)
    expect(screen.getByText('Buscador de Usuarios')).toBeInTheDocument()
  })

  it('muestra el icono de personas', () => {
    const { container } = render(<NavBar />)
    const icon = container.querySelector('svg[data-testid="PeopleIcon"]')
    expect(icon).toBeInTheDocument()
  })
})