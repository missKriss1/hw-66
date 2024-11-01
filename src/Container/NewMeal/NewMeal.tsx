import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axoisApi.ts';
import { IMealsAdd } from '../../types';
import MealForm from '../../Components/MealForm/MealForm.tsx';
import * as React from 'react';

interface Props {
  fetchMeals: () => void;
}

const NewMeal: React.FC<Props> = ({ fetchMeals }) => {
  const navigate = useNavigate();

  const addNewMeal = async (meal: IMealsAdd) => {
    try {
      await axiosApi.post(`/meals.json`, meal);
      fetchMeals();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <MealForm addNewMeal={addNewMeal}/>
    </div>
  );
};

export default NewMeal;
