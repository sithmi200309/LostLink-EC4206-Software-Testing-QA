
const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("node:assert/strict");

const baseUrl =
  process.env.API_BASE_URL || "http://127.0.0.1:5000";

const itemsPath =
  process.env.ITEMS_API_PATH || "/api/items";

let response;

Given("the LostLink backend is available", async function () {
  try {
    await fetch(`${baseUrl}${itemsPath}`);
  } catch (error) {
    throw new Error(
      `Backend is not reachable: ${error.message}`
    );
  }
});

When("I request the available item reports", async function () {
  response = await fetch(`${baseUrl}${itemsPath}`);
});

Then("the HTTP response status should be {int}", function (expectedStatus) {
  assert.equal(response.status, expectedStatus);
});

Then("the response should contain an items array", async function () {
  const data = await response.json();

  assert.ok(
    Array.isArray(data.items),
    "Expected the response to contain an items array"
  );
});

Then("the response should contain a count field", async function () {
  // Fetch again because the response body was read
  // by the previous step.
  const result = await fetch(`${baseUrl}${itemsPath}`);
  const data = await result.json();

  assert.equal(
    typeof data.count,
    "number",
    "Expected count to be a number"
  );
});
