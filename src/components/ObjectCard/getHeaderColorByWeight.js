export const getHeaderColorByWeight = weight => {
  if (weight === 0 || !weight) {
    return "#ff88b9";
  } else if (weight > 0) {
    return "#e63c82";
  } else {
    return "#ff579d";
  }
};
