import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Always start with false (desktop) to avoid hydration mismatches
  // This ensures server and client render the same initial state
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Only check on client after hydration
    const checkMobile = () => {
      setIsMobile(globalThis.window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value immediately
    checkMobile()
    
    const mql = globalThis.window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      checkMobile()
    }
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}
