import { IMeals } from '../../types';
import * as React from 'react';
import MealItem from './MealItem.tsx';

interface Props {
  meals: IMeals[];
  delateMeal:(id:string) => void;
}
const Meals: React.FC <Props> = ({meals, delateMeal}) => {
  return (
    <div>
      {meals.map((meal) =>(
        <MealItem meal={meal} key={meal.id} onDeleteMeal={() => delateMeal(meal.id)}/>
      ))}
    </div>
  );
};

export default Meals;