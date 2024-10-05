import { useEffect, useState } from "react"





export const useSize = () => {

    const [size,setSize] = useState<{w:number,h:number}>({
        w:window.innerWidth,
        h:window.innerHeight
    })
    useEffect(() => {
        const setWindowSize = () => {
            setSize(prev => ({...prev,
                                    w:window.innerWidth,
                                    h:window.innerHeight}))
        }
        window.addEventListener("resize",setWindowSize)

        return () => window.removeEventListener("resize",setWindowSize)
    },[])

    return size
}

export const useDetectScrolling = () => {
   const [isScrolling,setScrolling] = useState<boolean>(false)

   useEffect(() => {
    const scrollingDetect = () => {
        if(window.scrollY > 0 && !isScrolling) {
            setScrolling(true)
        } else if (window.scrollY === 0 && isScrolling) {
            setScrolling(false)
        }
    }
    window.addEventListener("scroll",scrollingDetect)

    return () => window.removeEventListener("scroll",scrollingDetect)
   },[isScrolling])

   return isScrolling
}