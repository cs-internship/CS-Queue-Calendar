import CryptoJS from "crypto-js";

const encryptedMessage =
    "U2FsdGVkX1+E4K7W4VrZ5GJTRp2x2yLW7trNh3dQ2yPIkAaVM03PLMDOzIX/Qa6cLfKzG8O5+olb41e2gNKbE94Sa+D1CPr8kLti5grBgRugMeu7btvLciabejzwxyXBrJfuV/R1hT/ml/cf6+9DCz49wvchTIubBVsD1w8e3XHceJtltuiZaFm5Zpd0yE29yq75BHHesW0HdJZO7A2SZE7OJpRnHgasoS95QJFsR1uiPPMEkMP8pROVTryS/2nfVoKNKbn4SDLDIe0mXk8Gq9J9PyJCR1bBbOZ5ItjD4QKThqDWErDOp0b69dkGXO1QY1vrNonH3S1G0s3eWXpjIUasvtJbk3vAIPsaakOXJUbBWaV9P3VlX82rMNjeYWQEg9So000Wd2MlvBjmE6xZduvSk1dCX/3USiEJDEQz1sD5qVTddfos2TtBieKMkkoRxihtVOrkiccPe9M1h94sgz6pStcJwF98VvHMNtkpOVQbvrj0zK79r1CdHzbcomN9i3rlpEZsjy0eUd3FWzhCuu3xz3fF+W1ZAlG1Gy8jVf10Gl5/4n17dHKWrN+0Sre88L4tHRmNnAosTsp7WwMFO/zNUOc05GyoypwWMLphOjMgmfTuAWekDrukVHaZY4f5VUg+ZMVpG8p1fNUBzY4PL7V9HG6HY1AZ3kmHgspp6tjXXi3zR6vK8Pqa2Q5uLs275QOHiWC6DOpJACdvi0aK9YFvy0oj3pV2KDjAT1tKkq+FviMZTRFNnVMV4qBhyg6LMKkVfyln/Lp+Y9XIS1lPYTQaOh/sNrk3s1b/XXNb5SuZcVi1MNL1tt68Bb+H/m65q41bNVCXf4hSV2I80TUAMwaYNCFjglI1XTa/g7GdjyxbsxauAUgCc6swhv7Jsl4H7jOnBa5gagsFiL/CdArbLdXrMSFqFe3IFcI4HWrJlvnWMue1FC+BDpBKQ47f33Dx1yT+Rgui+p/DV/1dA7cQPBW2UkANsGMsd61SM3PWhJgRxzGx6iYr0zNGVsxibnbzoMOgKAOyqvTYlNYGsXX8U8+cmHmJGb+04hP5QPstz34t1z73jN8gc9a59NrABpDOW8Jn3Uhuvoief+/EVt0BEpzbF/xoOzjoN/FZJ0rfFs/67hK2haSdKRp55G6sJuQupm3BajMs+4JCnc5W348WcIaaJkocWvYaIEvgKzppkINtDRWHJX22FjMiPK6RGIO2DmqwCeWbG1w1NZ4geTCjle0HuYTgD26XtYcXH5RGWUdJYu0e4CJRZFAkT9KthYXsNmnBmIqBZzJXpykSrNiQnPQJFbtAi57WVEVfi9QXZUthJm2FvU00wHi9g/qWJyhItxCYm3xGHeseiAfQuNDTVxkLN/LYkHGfqZ52lZK66GtMGO0g/4OS5Y0YIMLad6OLT4o6IJjqNi2CaXecYdbRsDTgXUvs4i/V+VmmtmZKIK6JSPsQUG/ReVWOjB4jnNB0sgha8PZh65l+2AXbPlF6YdxkaiH8R0D5L70g2zP/ahRf953+52KWMagU3NI8awYLxKgc+duI8TBbJbhsmXdQFy4Ae777TQpywaE8qnHKe+3rD2OBvexqXYW9EcHe81uMyRKFFFk5zPCscQuIfbMhQ7DLrP5wnHgJbjUDe5CgowYYv7PmYoMFLwPIsEiCNYHbkjM1XioJiOSmybA0vtDNl113oalXtpWTN5dj/fpbEjlKxPTwchocT672luSw9uJet//BKEjZEysqAFjU1+z2EmkV+797LechuGGctTAO+KON5JPB9jBPg3bYzDd1CZX+AxnA56/GaciRwyZ4bPXrpdLbEw42FEFy8d1i7OBAEbm6mYKHfmf73EeCGV7W76CxGpQ3WUi7cGp3GtzHk9C4nw==";

export const printEE = (key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (decrypted) {
            console.log(decrypted);
        } else {
            console.warn("Console message decryption failed.");
        }
    } catch (err) {
        console.error("Error decrypting console message:", err);
    }
};
