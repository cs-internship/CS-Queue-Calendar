import { ThemeProvider } from "./Theme/ThemeProvider";

const StoreProvider = ({ children }) => {
    return (
        <>
            <ThemeProvider>
                <>{children}</>
            </ThemeProvider>
        </>
    );
};

export default StoreProvider;
