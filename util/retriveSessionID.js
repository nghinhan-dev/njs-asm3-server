function retriveSessionID(str) {
  // Extract the desired part using string manipulation
  const startIndex = str.indexOf("s:") + 2;
  const endIndex = str.indexOf(".", startIndex);
  const extractedPart = str.substring(startIndex, endIndex);

  return extractedPart;
}

module.exports = { retriveSessionID };
