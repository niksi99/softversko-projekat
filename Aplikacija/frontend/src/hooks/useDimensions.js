import { useEffect, useState } from "react"

export const useDimensions = () => {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.setHeight);
        }

        setWidth(window.innerWidth);
        setHeight(window.setHeight);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { width, height }
}