const crypto = require("crypto");

// I have moved these outside the function as they are constants
// which improves performance. When a constant is declared outside of a
// function, it is only created once and its value is stored in memory.
// I also feel this helps to keep the code organized and reduces the
// clutter within functions. It can also help with usability.
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  // The if statement that checks if (candidate) has been removed,
  // as candidate will always have a value.
  // I set candidate to equal TRIVIAL_PARTITION_KEY and moved to
  // the beginning of the function.
  let candidate = TRIVIAL_PARTITION_KEY;

  // I simplified the below by removing the extra if/else statments
  // and using the || operator to check if event.partitionKey exists and
  // if not fall back to the crypto.createHash method
  if (event) {
    candidate =
      event.partitionKey ||
      crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  // The code has been reordered to check for the type of candidate
  // before checking its length, which is more logical and readable.
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};
