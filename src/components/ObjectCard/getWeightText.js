import { declension } from "../../utils/declension";

export const getWeightText = weight => {
  if (weight === 0 || !weight) {
    return "Интерес покупателей не определен";
  } else if (weight > 0) {
    const time = declension("раза", "раз", "раза", weight);

    return `Интерес покупателей в ${weight} ${time} выше среднего`;
  } else {
    const absWeight = Math.abs(weight);
    const time = declension("раз", "раз", "раза", absWeight);

    return `Интерес покупателей в ${absWeight} ${time} ниже среднего`;
  }
};
