export const declension = (oneNominative, severalGenitive, severalNominative, number) => {
  number = number % 100;
  return number <= 14 && number >= 11
    ? severalGenitive
    : (number %= 10) < 5
      ? number > 2
        ? severalNominative
        : number === 1 ? oneNominative : number === 0 ? severalGenitive : severalNominative
      : severalGenitive;
};
