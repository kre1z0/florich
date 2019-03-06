import { declension } from "../../utils/declension";

export const getWeightText = weight => {
  if (weight === 0 || !weight) {
    return "не определена";
  } else if (weight === 1) {
    return "равна средней по городу";
  } else if (weight > 0) {
    const time = declension("раза", "раз", "раза", weight);

    return `в ${weight} ${time} выше среднего`;
  } else {
    const absWeight = Math.abs(weight);
    const time = declension("раз", "раз", "раза", absWeight);

    return `в ${absWeight} ${time} ниже среднего`;
  }
};
