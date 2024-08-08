export function getRandomPastelColor() {
  const randomChannelValue = () => Math.floor(Math.random() * 50 + 205); // діапазон від 205 до 254
  const colorVariation = () => Math.floor(Math.random() * 50); // діапазон від 0 до 50

  const baseColors = ["blue", "green", "purple", "orange"];
  const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)];

  let r, g, b;

  switch (baseColor) {
    case "blue":
      r = colorVariation();
      g = colorVariation();
      b = randomChannelValue();
      break;
    case "green":
      r = colorVariation();
      g = randomChannelValue();
      b = colorVariation();
      break;
    case "purple":
      r = randomChannelValue();
      g = colorVariation();
      b = randomChannelValue();
      break;
    case "orange":
      r = randomChannelValue();
      g = randomChannelValue();
      b = colorVariation();
      break;
    default:
      r = randomChannelValue();
      g = randomChannelValue();
      b = randomChannelValue();
  }

  return `rgb(${r}, ${g}, ${b})`;
}
