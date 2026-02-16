import { useCallback, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../store/Theme/ThemeContext";

const Toastify = ({ toastifyObj }) => {
    const { theme: currentTheme } = useContext(ThemeContext);

    const notify = useCallback(
        ({ title, mode }) => {
            if (!toast[mode]) {
                console.error(`Invalid toast mode: ${mode}`);
                return;
            }

            toast[mode](title, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: { currentTheme },
            });
        },
        [currentTheme]
    );

    useEffect(() => {
        if (toastifyObj?.mode) {
            notify(toastifyObj);
        }
    }, [toastifyObj, notify]);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={currentTheme}
            />
        </div>
    );
};

export default Toastify;
