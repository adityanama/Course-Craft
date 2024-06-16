import { useEffect } from 'react'

const useOnClickOutside = (ref, handler) => {

    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.conatains(event.target)) {
                return;
            }

            handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
        }
    }, [ref,handler])
}

export default useOnClickOutside