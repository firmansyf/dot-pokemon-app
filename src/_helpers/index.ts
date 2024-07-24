export const getRandomColorById = (val: string) => {
  const hash = val?.split("").reduce((acc: any, char: any) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const color = Math.floor(
    Math.abs(Math.sin(hash) * 16777215) % 16777215
  ).toString(16);
  return "#" + "0".repeat(6 - color.length) + color;
};
