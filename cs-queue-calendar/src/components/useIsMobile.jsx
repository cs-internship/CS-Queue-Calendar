import { useEffect, useState } from "react";

export const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", handler);
        
        return () => window.removeEventListener("resize", handler);
    }, [breakpoint]);

    return isMobile;
};
