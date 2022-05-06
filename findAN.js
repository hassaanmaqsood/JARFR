function findAN(string) {
  packetA=[];
  packetN=[];
  startIndex=0;
  for (var i = 0; i < string.length; i++) {
    if ("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(string[i])) {
      if (!"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(string[i-1])) {
        startIndex=i;
      } else if (!"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(string[i+1])) {
        packetA.push(string.substring(startIndex, i+1));
      }
    };
    if ("0123456789".includes(string[i])) {
      if (!"0123456789".includes(string[i-1])) {
        startIndex=i;
      } else if (!"0123456789".includes(string[i+1])) {
        packetN.push(string.substring(startIndex, i+1));
      }
    };
  };
  return [packetA, packetN];
};
