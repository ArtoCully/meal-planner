import { IDayOfWeek } from '../dummyData';

export type GenerateDayOfWeekFunction = {
  enumDay: IDayOfWeek
}

export type IDayOfWeekText =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | '';

export function generateDayOfWeek(enumDay: IDayOfWeek): IDayOfWeekText {
  switch (enumDay) {
    case 0:
      return 'monday';
    case 1:
      return 'tuesday';
    case 2:
      return 'wednesday';
    case 3:
      return 'thursday';
    case 4:
      return 'friday';
    case 5:
      return 'saturday';
    case 6:
      return 'sunday';
    default:
      return '';
  }
}
