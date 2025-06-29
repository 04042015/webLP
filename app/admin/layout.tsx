import type React from "react"
import { AuthProvider, AdminProtectedRoute } from "@/components/auth/admin-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AdminProtectedRoute>{children}</AdminProtectedRoute>
    </AuthProvider>
  )
}
