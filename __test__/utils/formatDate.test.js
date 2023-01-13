import formatDate from "../../utils/formatDate";

describe('Util: formatDate', () => {
    it('formats miliseconds to date', () => {
        const milliseconds = 0;
        const expectedDate = "1.01.1970, 01:00";

        const date = formatDate(milliseconds);

        expect(date).toEqual(expectedDate);
    });

});