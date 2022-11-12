import { useLayoutEffect } from "react"

export default function useScrollToTop() {
    useLayoutEffect(() => {
        window.scrollTo({
            top: 0, 
            behavior: "auto"
        })
    }, [])
}