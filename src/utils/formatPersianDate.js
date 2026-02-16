import moment from "moment-jalaali";

import { convertToPersianNumbers } from "./convertToPersianNumbers";

moment.loadPersian({ dialect: "persian-modern" });

export const formatPersianDate = (dateObj) => {
    return convertToPersianNumbers(
        moment(
            moment(dateObj, "YYYY/M/D")
                ["_i"].split(" ")[0]
                .split("-")
                .slice(3)
                .join("/"),
            "jYYYY/jMM/jDD"
        ).format("jD jMMMM")
    );
};
