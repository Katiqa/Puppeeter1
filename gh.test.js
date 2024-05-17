let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 9000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 7000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 6000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 8000);
});

describe("Github another page tests", () => {
  test("Header Product Actions", async () => {
    await page.goto("https://github.com/features/actions");
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("Features • GitHub Actions · GitHub");
  }, 10000);

  test("Header Pricing", async () => {
    await page.goto("https://github.com/pricing");
    const h1Selector = ".h2-mktg";
    const selector2 = await page.$eval(h1Selector, (link) => link.textContent);
    await page.waitForSelector(h1Selector);
    expect(selector2).toEqual("Get the complete developer platform.");
  }, 10000);

  test("Header CI/CD", async () => {
    await page.goto("https://github.com/solutions/ci-cd");
    const classSelector = ".col-10-max";
    const selector2 = await page.$eval(
      classSelector,
      (link) => link.textContent
    );
    await page.waitForSelector(classSelector);
    expect(selector2).toEqual("The completeCI/CD solution");
  }, 10000);
});
