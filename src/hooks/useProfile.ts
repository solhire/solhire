import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserProfile, UpdateProfileInput } from '@/types/user'
import { toast } from 'react-hot-toast'

export const useProfile = () => {
  const { user } = useUser()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.id) {
      fetchProfile()
    }
  }, [user?.id])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile')
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      const data = await response.json()
      setProfile(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: UpdateProfileInput) => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update profile')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      toast.success('Profile updated successfully')
      return updatedProfile
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update profile'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const addPortfolioItem = async (data: any) => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to add portfolio item')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      toast.success('Portfolio item added successfully')
      return updatedProfile
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add portfolio item'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePortfolioItem = async (itemId: string, data: any) => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, ...data })
      })

      if (!response.ok) {
        throw new Error('Failed to update portfolio item')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      toast.success('Portfolio item updated successfully')
      return updatedProfile
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update portfolio item'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removePortfolioItem = async (itemId: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/profile/portfolio', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      })

      if (!response.ok) {
        throw new Error('Failed to remove portfolio item')
      }

      const updatedProfile = await response.json()
      setProfile(updatedProfile)
      toast.success('Portfolio item removed successfully')
      return updatedProfile
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove portfolio item'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    addPortfolioItem,
    updatePortfolioItem,
    removePortfolioItem,
    refreshProfile: fetchProfile
  }
} 