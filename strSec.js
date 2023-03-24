function strSec(s) {
  const regex = /^(\d+h)?\s*(\d+m)?\s*(\d+s)$/;
  const matches = s.match(regex);

  if (matches) {
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    const seconds = matches[3] ? parseInt(matches[3]) : 0;

    return (hours * 60 * 60) + (minutes * 60) + seconds;
  }

  return 0;
}
