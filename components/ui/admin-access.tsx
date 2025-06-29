"use client"

import { useState } from "react"
import { CustomButton } from "@/components/ui/custom-button"
import { Settings, Key } from "lucide-react"

export function AdminAccess() {
  const [showAdminLink, setShowAdminLink] = useState(false)

  const handleSecretClick = () => {
    const clicks = Number(localStorage.getItem("admin_clicks") || "0") + 1
    localStorage.setItem("admin_clicks", clicks.toString())

    if (clicks >= 5) {
      setShowAdminLink(true)
      localStorage.removeItem("admin_clicks")
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {showAdminLink ? (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="text-sm text-gray-600 mb-2">Admin Access Unlocked</p>
          <CustomButton variant="gradient" size="sm" onClick={() => (window.location.href = "/admin")}>
            <Key className="h-4 w-4 mr-2" />
            Admin Panel
          </CustomButton>
        </div>
      ) : (
        <button
          onClick={handleSecretClick}
          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center opacity-20 hover:opacity-40 transition-opacity"
          title="Secret admin access"
        >
          <Settings className="h-4 w-4 text-gray-600" />
        </button>
      )}
    </div>
  )
}
