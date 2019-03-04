import React from "react";
import getDay from "date-fns/get_day";
import getYear from "date-fns/get_year";
import getMonth from "date-fns/get_month";
import getDate from "date-fns/get_date";
import isWithinRange from "date-fns/is_within_range";

export const getWeekDay = weekDay => {
  switch (weekDay) {
    case 0:
      return "понедельника";
    case 1:
      return "вторника";
    case 2:
      return "среды";
    case 3:
      return "четверга";
    case 4:
      return "пятницы";
    case 5:
      return "субботы";
    case 6:
      return "воскресенья";
    default:
      return "до новой эры";
  }
};

const isHolyday = schedule => !schedule[0][0];

export const getScheduleValue = (workWeek = []) => {
  const currentDate = new Date();
  const currentYear = getYear(currentDate);
  const currentMonth = getMonth(currentDate);
  const currentDateNumber = getDate(currentDate);

  const weekDay = getDay(currentDate);
  const weekDayNewStandart = weekDay ? weekDay - 1 : 6;

  if (workWeek.length < 1) {
    return "График работы не известен";
  }

  const currentDayFromWorkWeek = workWeek[weekDayNewStandart];
  const prevWorkingDay = workWeek.findIndex((day, i) => !isHolyday(day) && i < weekDayNewStandart);
  const nextWorkingDay = workWeek.findIndex((day, i) => !isHolyday(day) && i > weekDayNewStandart);
  const nextWorkingWeekDayIndex = nextWorkingDay > 0 ? nextWorkingDay : prevWorkingDay;
  const nextWorkingWeekDay = workWeek[nextWorkingWeekDayIndex];

  let breakUp = null;

  const currDateIsWithinRange = currentDayFromWorkWeek.findIndex((time, index, array) => {
    if (!time[0]) {
      return;
    }

    const prevTimeRange = array[index - 1];
    const [startHours, startMinutes] = time[0].split(":");
    const [endHours, endMinutes] = time[1].split(":");

    const startDate = new Date(
      currentYear,
      currentMonth,
      currentDateNumber,
      +startHours,
      +startMinutes
    );
    const endDate = new Date(currentYear, currentMonth, currentDateNumber, +endHours, +endMinutes);

    if (prevTimeRange) {
      const prevTime = prevTimeRange[prevTimeRange.length - 1];
      const [prevTimeHours, prevTimeMinutes] = prevTime.split(":");

      const prevTimeStartDate = new Date(
        currentYear,
        currentMonth,
        currentDateNumber,
        +prevTimeHours,
        +prevTimeMinutes
      );

      if (isWithinRange(currentDate, prevTimeStartDate, startDate)) {
        breakUp = time[0];
      }
    }

    return isWithinRange(currentDate, startDate, endDate);
  });

  const daysToWork =
    weekDayNewStandart > nextWorkingWeekDayIndex
      ? 7 - weekDayNewStandart + nextWorkingWeekDayIndex
      : nextWorkingWeekDayIndex - weekDayNewStandart;

  const dayAndNight =
    !isHolyday(currentDayFromWorkWeek) && currentDayFromWorkWeek[0][1] === "24:00";

  if (workWeek.length < 1) {
    return "График работы не известен";
  } else if (dayAndNight) {
    return "Работает 24 часа";
  } else if (!isHolyday(currentDayFromWorkWeek) && currDateIsWithinRange >= 0) {
    const currTime = currentDayFromWorkWeek[currDateIsWithinRange];
    const worksUp = currTime[currTime.length - 1];

    return `Открыто до ${worksUp}`;
  } else {
    const notToday =
      daysToWork > 1 ? getWeekDay(nextWorkingWeekDayIndex) : nextWorkingWeekDay[0][0];
    return `Закрыто до ${breakUp || notToday}`;
  }
};
