import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingState } from '../LoadingState'


describe('LoadingState', () => {
  it('muestra el mensaje de carga', () => {
    render(<LoadingState />)
    expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument()
  })

  it('muestra el spinner de carga', () => {
    const { container } = render(<LoadingState />)
    const spinner = container.querySelector('.MuiCircularProgress-root')
    expect(spinner).toBeInTheDocument()
  })
})