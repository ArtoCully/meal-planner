enum ITimeOfMeal {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner'
}

interface IReceipe {
  title: string;
  when: ITimeOfMeal[];
}

export enum IDayOfWeek {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

interface IDailyMenuProps {
  title: string;
  when: ITimeOfMeal;
}

interface IWeeklyMenuProps {
  [key: string]: IDailyMenuProps[];
}

export const receipes: IReceipe[] = [
  {
    title: 'cereal',
    when: [ITimeOfMeal.breakfast],
  },
  {
    title: 'tortalini w/ tomatoe juice',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner]
  },
  {
    title: 'soup w/ garlic bread',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner]
  },
  {
    title: 'baked potatoes',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner]
  },
  {
    title: 'spanish bean',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner]
  },
  {
    title: 'croissant w/ egg and salmon',
    when: [ITimeOfMeal.breakfast, ITimeOfMeal.lunch]
  },
  {
    title: 'lentil dhal',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner]
  }
];

export const weeklyMenu: IWeeklyMenuProps[] = [
  { 'monday': [
      {
        title: 'cereal',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'tortalini w/ tomatoe juice',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'baked potatoes',
        when: ITimeOfMeal.dinner,
      }
    ],
  },
  { 'tuesday': [
      {
        title: 'cereal',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'salmon',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'soup',
        when: ITimeOfMeal.dinner,
      }
    ],
  },
  { 'wednesday': [
      {
        title: 'eggs',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'chili con carne',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'sandwhich',
        when: ITimeOfMeal.dinner,
      }
    ],
  },
  { 'thursday': [
      {
        title: 'cereal',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'lasagne',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'pasta',
        when: ITimeOfMeal.dinner,
      }
    ],
  },
  { 'friday': [
      {
        title: 'cereal',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'pizza',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'chicken with rice',
        when: ITimeOfMeal.dinner,
      }
    ],
  },
  { 'saturday': [
      {
        title: 'cereal',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'pizza',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'chicken with rice',
        when: ITimeOfMeal.dinner,
      }
    ],
  },
    { 'saturday': [
      {
        title: 'cereal',
        when: ITimeOfMeal.breakfast,
      },
      {
        title: 'fish & chips takeaway',
        when: ITimeOfMeal.lunch,
      },
      {
        title: 'tortallini',
        when: ITimeOfMeal.dinner,
      }
    ],
  }
]
