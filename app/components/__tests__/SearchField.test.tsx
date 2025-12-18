import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchField from '../SearchField'

describe('SearchField', () => {
  it('renderiza correctamente', () => {
    const mockOnChange = vi.fn()
    render(<SearchField searchValue="" onSearchValueChange={mockOnChange} />)
    
    expect(screen.getByPlaceholderText(/buscar usuario/i)).toBeInTheDocument()
  })

  it('llama a onChange al escribir', async () => {
    const user = userEvent.setup()
    const mockOnChange = vi.fn()
    render(<SearchField searchValue="" onSearchValueChange={mockOnChange} />)
    
    await user.type(screen.getByPlaceholderText(/buscar usuario/i), 'Test')
    
    expect(mockOnChange).toHaveBeenCalled()
  })
})