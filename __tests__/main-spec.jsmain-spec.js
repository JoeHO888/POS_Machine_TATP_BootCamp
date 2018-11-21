const main = require('../main');

it ('should add two numbers', () => {
    expect(main.getAllDetailsOfAnItem(2, 3)).toBe(5);
});