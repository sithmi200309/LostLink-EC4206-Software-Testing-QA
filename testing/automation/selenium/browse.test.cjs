
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("node:assert/strict");

async function runTest() {
  console.log("Starting Selenium test...");

  const driver = await new Builder()
    .forBrowser("chrome")
    .build();

  try {
    console.log("Opening LostLink frontend...");

   await driver.get("http://localhost:5174");

    await driver.wait(
      until.elementLocated(By.css("body")),
      10000
    );

    const body = await driver.findElement(By.css("body"));
    const visibleText = await body.getText();

    assert.ok(
      visibleText.trim().length > 0,
      "Expected visible content on the LostLink page"
    );

    console.log("PASS: LostLink frontend displays content");
  } finally {
    await driver.quit();
  }
}

runTest().catch(error => {
  console.error("FAIL:", error.message);
  process.exitCode = 1;
});
