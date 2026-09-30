import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { getUserById } from '../api/users'
import type { User } from '../types/models'
import type { UserProfileProps } from '../types/components'

export const UserProfile: FC<UserProfileProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    const loadUser = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getUserById(userId)
        if (!isCancelled) {
          setUser(data)
        }
      } catch {
        if (!isCancelled) {
          setError('Не вдалося завантажити дані користувача')
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadUser()

    return () => {
      isCancelled = true
    }
  }, [userId])

  if (isLoading) {
    return <p role="status">Завантаження...</p>
  }

  if (error) {
    return <p role="alert">{error}</p>
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phone}</p>
      <p>Сайт: {user.website}</p>
      <p>Компанія: {user.company.name}</p>
      <p>Місто: {user.address.city}</p>
    </div>
  )
}