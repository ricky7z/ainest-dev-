import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/contexts/admin-context'
import { toast } from 'sonner'

interface UseInactivityTimeoutProps {
  timeoutMinutes?: number
  warningMinutes?: number
}

export function useInactivityTimeout({ 
  timeoutMinutes = 30, 
  warningMinutes = 5 
}: UseInactivityTimeoutProps = {}) {
  const router = useRouter()
  const { user, logout } = useAdmin()
  const timeoutRef = useRef<NodeJS.Timeout>()
  const warningRef = useRef<NodeJS.Timeout>()
  const lastActivityRef = useRef<number>(Date.now())
  const isWarningShownRef = useRef<boolean>(false)

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now()
    isWarningShownRef.current = false

    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current)
    }

    // Set warning timer
    warningRef.current = setTimeout(() => {
      isWarningShownRef.current = true
      toast.warning(
        `You will be logged out in ${warningMinutes} minutes due to inactivity. Click anywhere to stay logged in.`,
        {
          duration: 10000,
          action: {
            label: 'Stay Logged In',
            onClick: () => resetTimer()
          }
        }
      )
    }, (timeoutMinutes - warningMinutes) * 60 * 1000)

    // Set logout timer
    timeoutRef.current = setTimeout(async () => {
      toast.error('You have been logged out due to inactivity.')
      await logout()
      router.push('/admin')
    }, timeoutMinutes * 60 * 1000)
  }, [timeoutMinutes, warningMinutes, logout, router])

  const handleActivity = useCallback(() => {
    if (isWarningShownRef.current) {
      toast.success('Session extended!')
    }
    resetTimer()
  }, [resetTimer])

  useEffect(() => {
    if (!user) return

    // Set initial timer
    resetTimer()

    // Activity events
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'focus'
    ]

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current)
      }
    }
  }, [user, handleActivity, resetTimer])

  // Return functions for manual control
  const extendSession = useCallback(() => {
    resetTimer()
    toast.success('Session extended!')
  }, [resetTimer])

  const getTimeRemaining = useCallback(() => {
    const timeElapsed = Date.now() - lastActivityRef.current
    const timeRemaining = (timeoutMinutes * 60 * 1000) - timeElapsed
    return Math.max(0, Math.floor(timeRemaining / 1000))
  }, [timeoutMinutes])

  return {
    extendSession,
    getTimeRemaining,
    isWarningShown: isWarningShownRef.current
  }
} 