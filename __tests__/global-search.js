"use strict";

const puppeteer = require("puppeteer");

let browser;
let page;

const getStyleForElement = async (selector, property) => {
    return await page.evaluate((selector, property) => {
        const el = document.querySelector(selector);
        const style = window.getComputedStyle(el);
        return style[property];
    }, selector, property);
};

const tests = [
    {
        selector: "#global-enhancements-search-query.wt-input",
        property: "padding-left",
        expected: "18px",
    },
    {
        selector: "#global-enhancements-search-query.wt-input",
        property: "border-top-left-radius",
        expected: "96px",
    },
];

describe("Homepage", () => {
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("https://www.etsy.com");
    });

    afterAll(async () => {
        await browser.close();
    });

    tests.forEach(testCase => {
        it(`Search input - ${testCase.property}`, async () => {
            const value = await getStyleForElement(
                testCase.selector,
                testCase.property
            );
            expect(value).toBe(testCase.expected);
        });
    });
});
