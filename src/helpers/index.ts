const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function getUpcomingDays(): Array<{date: number, day: string}> {
  let days = [];
  weekDays.forEach((day: string, index: number) => {
    const currentDate = new Date();

    if (index > 0) {
      currentDate.setDate(days[index - 1].date + 1);
    }

    days.push({
      date: currentDate.getDate(),
      day: weekDays[currentDate.getDay()]
    });
  });

  return days;
};

export function getLocation(positionHandler: (positon: Object) => void): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionHandler);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

export function getCurrentForecast(daylyForecasts, date) {
  return daylyForecasts.find(item => item.date.split(' ')[0] === date.toString());
}
