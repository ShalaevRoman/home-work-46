import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UserProfile } from './UserProfile'
import { getUserById } from '../api/users'
import type { User } from '../types/models'

vi.mock('../api/users', () => ({
  getUserById: vi.fn(),
}))

const mockedGetUserById = vi.mocked(getUserById)

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: { lat: '-37.3159', lng: '81.1496' },
  },
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
}

describe('UserProfile', () => {
  it('показує індикатор завантаження під час запиту', () => {
    mockedGetUserById.mockReturnValue(new Promise(() => {}))

    render(<UserProfile userId={1} />)

    expect(screen.getByRole('status')).toHaveTextContent('Завантаження...')
  })

  it('відображає дані користувача після успішного запиту', async () => {
    mockedGetUserById.mockResolvedValue(mockUser)

    render(<UserProfile userId={1} />)

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    })

    expect(screen.getByText(/Sincere@april.biz/)).toBeInTheDocument()
    expect(screen.getByText(/Romaguera-Crona/)).toBeInTheDocument()
    expect(screen.getByText(/Gwenborough/)).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('показує повідомлення про помилку, якщо запит не вдався', async () => {
    mockedGetUserById.mockRejectedValue(new Error('Network error'))

    render(<UserProfile userId={1} />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Не вдалося завантажити дані користувача',
      )
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})