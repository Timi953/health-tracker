import type { Meal, MealType } from "@/types";
import { getDaysAgo } from "@/lib/date-utils";

interface MealTemplate {
  name: string;
  calories: number;
  mealType: MealType;
}

const breakfasts: MealTemplate[] = [
  { name: "Oatmeal with Berries", calories: 350, mealType: "breakfast" },
  { name: "Scrambled Eggs and Toast", calories: 420, mealType: "breakfast" },
  { name: "Greek Yogurt Parfait", calories: 280, mealType: "breakfast" },
  { name: "Avocado Toast", calories: 380, mealType: "breakfast" },
  { name: "Protein Pancakes", calories: 450, mealType: "breakfast" },
  { name: "Smoothie Bowl", calories: 320, mealType: "breakfast" },
];

const lunches: MealTemplate[] = [
  { name: "Chicken Salad", calories: 520, mealType: "lunch" },
  { name: "Turkey Wrap", calories: 480, mealType: "lunch" },
  { name: "Quinoa Bowl", calories: 550, mealType: "lunch" },
  { name: "Grilled Chicken Sandwich", calories: 600, mealType: "lunch" },
  { name: "Tuna Salad", calories: 440, mealType: "lunch" },
  { name: "Veggie Stir Fry", calories: 420, mealType: "lunch" },
];

const dinners: MealTemplate[] = [
  { name: "Grilled Salmon", calories: 650, mealType: "dinner" },
  { name: "Chicken Breast with Rice", calories: 700, mealType: "dinner" },
  { name: "Pasta with Meat Sauce", calories: 750, mealType: "dinner" },
  { name: "Steak with Vegetables", calories: 720, mealType: "dinner" },
  { name: "Shrimp Stir Fry", calories: 580, mealType: "dinner" },
  { name: "Baked Chicken Thighs", calories: 620, mealType: "dinner" },
];

const snacks: MealTemplate[] = [
  { name: "Protein Shake", calories: 200, mealType: "snack" },
  { name: "Mixed Nuts", calories: 250, mealType: "snack" },
  { name: "Apple with Peanut Butter", calories: 280, mealType: "snack" },
  { name: "Protein Bar", calories: 220, mealType: "snack" },
  { name: "Trail Mix", calories: 300, mealType: "snack" },
];

function buildMeals(): Meal[] {
  const meals: Meal[] = [];
  let mealId = 1;

  for (let day = 29; day >= 0; day--) {
    const date = getDaysAgo(day);

    // Every day gets breakfast and lunch
    const breakfast = breakfasts[day % breakfasts.length];
    meals.push({
      id: `m${mealId++}`,
      date,
      name: breakfast.name,
      calories: breakfast.calories,
      mealType: breakfast.mealType,
      createdAt: date + "T08:00:00.000Z",
    });

    const lunch = lunches[day % lunches.length];
    meals.push({
      id: `m${mealId++}`,
      date,
      name: lunch.name,
      calories: lunch.calories,
      mealType: lunch.mealType,
      createdAt: date + "T12:30:00.000Z",
    });

    // Most days get dinner (skip a few to add variety)
    if (day % 7 !== 3) {
      const dinner = dinners[day % dinners.length];
      meals.push({
        id: `m${mealId++}`,
        date,
        name: dinner.name,
        calories: dinner.calories,
        mealType: dinner.mealType,
        createdAt: date + "T18:30:00.000Z",
      });
    }

    // About half the days get a snack
    if (day % 2 === 0) {
      const snack = snacks[day % snacks.length];
      meals.push({
        id: `m${mealId++}`,
        date,
        name: snack.name,
        calories: snack.calories,
        mealType: snack.mealType,
        createdAt: date + "T15:00:00.000Z",
      });
    }
  }

  return meals;
}

export const mockMeals: Meal[] = buildMeals();
