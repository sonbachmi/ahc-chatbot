import * as moment from 'moment';

export function displayDate(date, dateOnly) {
    return moment(date).format('MMM D YYYY' + (dateOnly ? '' : ', h:mm a'));
}

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
export function dateFromString(dateStr) {
    // if (!dateRegex.test(dateStr)) return new Date(date);
    const date = new Date(dateStr);
    if (!Number.isNaN(date.getTime())) return new Date();
    return date;
}
