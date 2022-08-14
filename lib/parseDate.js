const { padStart } = require('lodash');

const DATE =
    /^(?<year>[1-2][09][0-9][0-9])-(?<month>([1][0-2]|[0]{0,1}[1-9]))-(?<day>([3][0-1]|[1-2][0-9]|[0]{0,1}[1-9]))/;

const parseDate = (date) => {
    if (!date) {
        return undefined;
    }

    const match = DATE.exec(date);

    if (!match) {
        return date;
    }

    const { year, month, day } = match.groups;

    return `${year}-${padStart(month, 2, '0')}-${padStart(day, 2, '0')}`;
};

const parseYear = (date) => {
    if (!date) {
        return undefined;
    }

    const match = DATE.exec(date);

    if (!match) {
        return undefined;
    }

    const { year } = match.groups;

    return Number.parseInt(year, 10);
};

module.exports = {
    parseDate,
    parseYear,
};
