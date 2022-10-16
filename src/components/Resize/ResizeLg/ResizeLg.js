import { useEffect, useState } from "react";

const getIsMobileLg = () => window.innerWidth <= 1024;

export default function useIsMobileLg() {
    const [isMobileLg, setIsMobileLg] = useState(getIsMobileLg());

    useEffect(() => {
        const onResize = () => {
            setIsMobileLg(getIsMobileLg());
        }

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    return isMobileLg;
}