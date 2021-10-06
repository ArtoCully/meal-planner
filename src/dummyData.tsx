export enum ITimeOfMeal {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner'
}

export interface IRecipe {
  title: string;
  when: ITimeOfMeal[];
  ingredients: string[];
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

export interface IDailyMenuProps {
  title: string;
  when: ITimeOfMeal;
}

export interface IWeeklyMenuProps {
  [key: string]: IDailyMenuProps[];
}

export const recipes: IRecipe[] = [
  {
    title: 'cereal',
    when: [ITimeOfMeal.breakfast],
    ingredients: [
      'milk',
      'weetabix',
      'fruits'
    ],
  },
  {
    title: 'tortalini w/ tomatoe juice',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner],
    ingredients: [
      'tomatoe',
      'juice',
      'tortalini',
      'pepper',
    ],
  },
  {
    title: 'soup w/ garlic bread',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner],
    ingredients: [
      'garlic bread',
      'double cream',
      'pepper',
    ],
  },
  {
    title: 'baked potatoes',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner],
    ingredients: [
      '3 potatoes',
      'tuna fish',
    ],
  },
  {
    title: 'spanish bean',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner],
    ingredients: [
      'beans',
      'lentils',
    ],
  },
  {
    title: 'croissant w/ egg and salmon',
    when: [ITimeOfMeal.breakfast, ITimeOfMeal.lunch],
    ingredients: [
      '3 croissants',
      '2 eggs',
      '1 smoked salmon',
    ],
  },
  {
    title: 'lentil dhal',
    when: [ITimeOfMeal.lunch, ITimeOfMeal.dinner],
    ingredients: [
      'lentils',
      'dhal',
      'salt',
      'pepper',
    ],
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
  { 'sunday': [
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
