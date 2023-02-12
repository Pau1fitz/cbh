const { deterministicPartitionKey } = require("./dpk");
const assert = require("assert");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("should return '0' when event is undefined", () => {
    const event = undefined;
    const expected = "0";
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it("should return the partitionKey if it exists", () => {
    const event = { partitionKey: "abc" };
    const expected = "abc";
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it("should return a hash of the event if the partitionKey does not exist", () => {
    const event = { someKey: "someValue" };
    const expected = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it("should return a hash of the candidate if its length is greater than MAX_PARTITION_KEY_LENGTH", () => {
    const longString = "a".repeat(257);
    const event = { partitionKey: longString };
    const expected = crypto
      .createHash("sha3-512")
      .update(longString)
      .digest("hex");
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });

  it("should return the stringified candidate if its type is not string", () => {
    const event = { partitionKey: 123 };
    const expected = "123";
    const actual = deterministicPartitionKey(event);
    assert.strictEqual(actual, expected);
  });
});
