export const convertToPersianNumbers = (str) => {
    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
    return str.replace(/[0-9]/g, (char) => persianNumbers[parseInt(char, 10)]);
};
