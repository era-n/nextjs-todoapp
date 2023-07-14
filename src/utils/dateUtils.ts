import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(calendar);
dayjs.extend(timezone);

const tz = dayjs.tz.guess();

export function getTime(createdAt: number) {
  console.log(
    dayjs(createdAt).calendar(null, {
      sameDay: "HH:mm",
    })
  );
  return dayjs(createdAt).calendar(null, {
    sameDay: "HH:mm",
  });
}
