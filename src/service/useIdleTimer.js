import { useEffect, useRef } from 'react';

const useIdleTimer = (onIdle, idleTime = 60000) => {
    const idleTimeout = useRef(null);
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    const resetIdleTimeout = () => {
        if (idleTimeout.current) {
            clearTimeout(idleTimeout.current);
        }
        idleTimeout.current = setTimeout(onIdle, idleTime);
    };

    useEffect(() => {
        events.forEach(event => window.addEventListener(event, resetIdleTimeout));

        resetIdleTimeout(); // Initialize the timer

        return () => {
            events.forEach(event => window.removeEventListener(event, resetIdleTimeout));
            if (idleTimeout.current) {
                clearTimeout(idleTimeout.current);
            }
        };
    }, [idleTime]);

    return null;
};

export default useIdleTimer;
