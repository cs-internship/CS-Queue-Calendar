export const createTds = () => {
    const tds = document.querySelectorAll("td");

    tds.forEach((td) => {
        td.title = td.title.split("\n")[0];
    });

    tds.forEach((td) => {
        const gregorianDate = td.title;
        if (gregorianDate) {
            const moment = require("moment-jalaali");

            const persianDate = moment(gregorianDate, "YYYY-MM-DD")
                .locale("fa")
                .format("jYYYY/jMM/jDD");

            td.title = `${gregorianDate}\n${persianDate}`;
        }
    });
};
