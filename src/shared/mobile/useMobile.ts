import { useState, useEffect } from "react"

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(checkIsMobile())

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function handleResize() {
        setIsMobile(checkIsMobile())
    }

    function checkIsMobile() {
        return window.innerWidth < 768 ? true : false
    }

    return isMobile
}

export { useMobile }
