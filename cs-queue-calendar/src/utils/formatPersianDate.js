import moment from "moment-jalaali";
import { convertToPersianNumbers } from "./convertToPersianNumbers";

moment.loadPersian({ dialect: "persian-modern" });

export const formatPersianDate = (dateObj) => {
    const rawDate = moment(dateObj, "YYYY/M/D")["_i"];
    const jDate = rawDate.split(" ")[0].split("-").slice(3).join("/");
    return convertToPersianNumbers(
        moment(jDate, "jYYYY/jMM/jDD").format("jD jMMMM")
    );
};
