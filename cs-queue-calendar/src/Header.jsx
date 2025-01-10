import React, { useState } from "react";
import CryptoJS from "crypto-js";

const date = "1403-04-19";

const Header = () => {
    const [EEClicked, setEEClicked] = useState([false, false]);

    const decrypt = (text) => {
        const bytes = CryptoJS.AES.decrypt(text, date);
        const plainText = bytes.toString(CryptoJS.enc.Utf8);
        return plainText;
    };

    const clickOnEE = (dashNO) => {
        if (!EEClicked[dashNO]) {
            window.open(
                decrypt(
                    "U2FsdGVkX18+Oy1rQJJnOndkAB/1o8SBRhMt5NBlIXv20iVTfc/FeDTfPFC1TJhp53XOM5/xczuw1jT6tHsOAQ=="
                ),
                "_blank"
            );

            setEEClicked((prevState) => {
                const newState = [...prevState];
                newState[dashNO] = true;
                return newState;
            });
        }
    };

    return (
        <div className={"header-container"}>
            <h1>
                <div
                    className={!EEClicked[0] && "header-ICARUS"}
                    onClick={() => clickOnEE(0)}
                >
                    -
                </div>
                <div className={"header-title"}>CS-Queue-Calendar</div>
                <div
                    className={!EEClicked[1] && "header-ICARUS"}
                    onClick={() => clickOnEE(1)}
                >
                    -
                </div>
            </h1>
        </div>
    );
};

export default Header;
