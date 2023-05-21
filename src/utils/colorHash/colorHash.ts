/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */

// taken from https://stackoverflow.com/a/16348977
export function colorHash(s: string) {
  // Generate a hash code for the input string
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash code to a hex string
  const hexCode = ((hash >>> 0) & 0xffffff).toString(16).padStart(6, '0');

  // Calculate the pastel color based on the hex code
  const r = parseInt(hexCode.substring(0, 2), 16);
  const g = parseInt(hexCode.substring(2, 4), 16);
  const b = parseInt(hexCode.substring(4, 6), 16);
  const brightness = 0.7; // Adjust as desired
  const pastelColor =
    ((r + (255 - r) * brightness) << 16) |
    ((g + (255 - g) * brightness) << 8) |
    ((b + (255 - b) * brightness) << 0);

  // Convert the pastel color to a hex string and return it
  return '#' + pastelColor.toString(16).padStart(6, '0');
}
