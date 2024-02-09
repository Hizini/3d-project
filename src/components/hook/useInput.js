import { useEffect, useState } from "react";

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        jump: false,
    });
    const [jumping, setJumping] = useState(false);

    const keys = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
        ShiftLeft: "shift",
        Space: "jump",
    };

    const findKey = (key) => keys[key];

    const handleKeyDown = (e) => {
        if (findKey(e.code) === "jump") {
            setJumping(true);
        }
        setInput((m) => ({ ...m, [findKey(e.code)]: true }));
    };
    const handleKeyUp = (e) => {
        if (findKey(e.code) === "jump") {
            const timer = setTimeout(() => {
                setInput({ ...input, jump: false });
                setJumping(false);
            }, 1800);
            return () => clearTimeout(timer);
        } else setInput((m) => ({ ...m, [findKey(e.code)]: false }));
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
    return { input, jumping };
};
