import isBlank from "../../utils/isBlank";

describe('Util isBlank', () => {
    it('checks if input is an empty string', () => {
        const blank = '';
        const notBlank = "test";

        expect(isBlank(blank)).toBe(true);
        expect(isBlank(notBlank)).toBe(false);
    });
});