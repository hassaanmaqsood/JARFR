function findAN(string) {
  const packetA = [];
  const packetN = [];
  let startIndex = 0;

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (/[a-zA-Z]/.test(char)) {
      if (!/[a-zA-Z]/.test(string[i - 1])) {
        startIndex = i;
      } else if (!/[a-zA-Z]/.test(string[i + 1])) {
        packetA.push(string.substring(startIndex, i + 1));
      }
    } else if (/[0-9]/.test(char)) {
      if (!/[0-9]/.test(string[i - 1])) {
        startIndex = i;
      } else if (!/[0-9]/.test(string[i + 1])) {
        packetN.push(string.substring(startIndex, i + 1));
      }
    }
  }

  return [packetA, packetN];
}
