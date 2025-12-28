"use client"

import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import * as React from "react"

type UserData = {
  name: string
  email: string
  user: User | null
}

/**
 * Hook to get the current authenticated user from Supabase
 * @returns User data including name, email, and the full user object, plus loading and error states
 */
export function useUser() {
  const [userData, setUserData] = React.useState<UserData | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    let mounted = true

    async function fetchUser() {
      try {
        setIsLoading(true)
        setError(null)

        const supabase = createClient()
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          throw userError
        }

        if (!mounted) return

        if (user) {
          // Extract name from user metadata or email
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "User"

          setUserData({
            name,
            email: user.email || "",
            user,
          })
        } else {
          setUserData(null)
        }
      } catch (err) {
        if (!mounted) return
        setError(err instanceof Error ? err : new Error("Failed to fetch user"))
        setUserData(null)
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchUser()

    // Listen for auth state changes
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        if (session?.user) {
          const name =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "User"

          setUserData({
            name,
            email: session.user.email || "",
            user: session.user,
          })
        } else {
          setUserData(null)
        }
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return {
    user: userData,
    isLoading,
    error,
  }
}

