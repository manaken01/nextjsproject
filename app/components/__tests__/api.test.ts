import { fetchUsers, fetchUserById } from '../../services/user/user'
import { describe, it, expect, vi, beforeEach } from 'vitest'
// Mock de fetch global
global.fetch = vi.fn()

describe('API Service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchUsers', () => {
    it('obtiene la lista de usuarios correctamente', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
          address: {
            street: 'Kulas Light',
            suite: 'Apt. 556',
            city: 'Gwenborough',
            zipcode: '92998-3874',
            geo: { lat: '-37.3159', lng: '81.1496' },
          },
          phone: '1-770-736-8031 x56442',
          website: 'hildegard.org',
          company: {
            name: 'Romaguera-Crona',
            catchPhrase: 'Multi-layered client-server neural-net',
            bs: 'harness real-time e-markets',
          },
        },
      ]

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })

      const users = await fetchUsers()

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users',
        { cache: 'no-store' }
      )
      expect(users).toEqual(mockUsers)
      expect(users).toHaveLength(1)
      expect(users[0].name).toBe('Leanne Graham')
    })

    it('lanza error cuando la API falla', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
      })

      await expect(fetchUsers()).rejects.toThrow('Error al cargar usuarios')
    })
  })

  describe('fetchUserById', () => {
    it('obtiene un usuario por ID correctamente', async () => {
      const mockUser = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: { lat: '-37.3159', lng: '81.1496' },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      })

      const user = await fetchUserById('1')

      expect(global.fetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/1',
        { cache: 'no-store' }
      )
      expect(user).toEqual(mockUser)
      expect(user.id).toBe(1)
    })

    it('lanza error cuando no encuentra el usuario', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
      })

      await expect(fetchUserById('999')).rejects.toThrow(
        'Error al cargar el usuario'
      )
    })
  })
})