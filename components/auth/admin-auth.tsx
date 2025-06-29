"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomButton } from "@/components/ui/custom-button"
import { Eye, EyeOff, Lock } from "lucide-react"

// Simple auth context
interface AuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("langsapost_admin_auth")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const login = (password: string) => {
    // Simple password check - in production, use proper authentication
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"

    if (password === adminPassword) {
      setIsAuthenticated(true)
      localStorage.setItem("langsapost_admin_auth", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("langsapost_admin_auth")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

interface AdminLoginProps {
  onLogin: () => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (login(password)) {
      onLogin()
    } else {
      setError("Password salah. Silakan coba lagi.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-langsapost-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-langsapost-600" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-gray-600">Masukkan password untuk mengakses panel admin</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-langsapost-500"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}

            <CustomButton type="submit" variant="gradient" className="w-full" disabled={isLoading}>
              {isLoading ? "Memverifikasi..." : "Login"}
            </CustomButton>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Demo Access:</h4>
            <p className="text-sm text-gray-600">
              Password default: <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
            </p>
            <p className="text-xs text-gray-500 mt-2">Untuk produksi, ganti password di environment variables</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [showLogin, setShowLogin] = useState(!isAuthenticated)

  if (showLogin) {
    return <AdminLogin onLogin={() => setShowLogin(false)} />
  }

  return <>{children}</>
}
