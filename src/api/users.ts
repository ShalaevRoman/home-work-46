import { fetchJson } from './client'
import { API_BASE_URL } from '../constants/config'
import type { User } from '../types/models'

export async function getUserById(id: number): Promise<User> {
  return fetchJson<User>(`${API_BASE_URL}/users/${id}`)
}