import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'


interface Props {
  children: ReactNode
}

export function PrivateRoute({ children }: Props) {
  const { token, loading } = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  } 

  if (!token) {
    return <Navigate to="/" replace />
  }

  return (
    <>
     
      {children}
    </>
  )
}
