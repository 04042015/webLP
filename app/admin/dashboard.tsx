'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '@/lib/supabaseClient'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin/login')
      } else {
        setEmail(session.user.email)
        setLoading(false)
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Selamat datang, <b>{email}</b></p>
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </main>
  )
    }
