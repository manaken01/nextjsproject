import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserCard from '../UserCard'
import { IUser } from '@/app/types/user/userTypes' 

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('UserCard', () => {
  const mockUser: IUser = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      city: 'New York',
      street: '123 Main St',
      suite: 'Apt 4',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' },
    },
    phone: '123-456-7890',
    website: 'johndoe.com',
    company: {
      name: 'Test Company',
      catchPhrase: 'Test Phrase',
      bs: 'Test BS',
    },
  }

  it('renderiza la información del usuario', () => {
    render(<UserCard user={mockUser} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('@johndoe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })
})