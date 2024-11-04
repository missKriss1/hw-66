import { useNavigate } from 'react-router-dom';
import axiosApi from '../../axoisApi.ts';
import { IMealsAdd } from '../../types';
import MealForm from '../../Components/MealForm/MealForm.tsx';
import * as React from 'react';
import { useState } from 'react';
import Spinner from '../../UI/Spinner/Spinner.tsx';

interface Props {
  fetchMeals: () => void;
}

const NewMeal: React.FC<Props> = ({ fetchMeals }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addNewMeal = async (meal: IMealsAdd) => {
    setLoading(true);
    try {
      await axiosApi.post(`/meals.json`, meal);
      fetchMeals();
      navigate('/');
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading ? (
      <Spinner/>
    ): (
      <div>
        <MealForm addNewMeal={addNewMeal}/>
      </div>
    )}
    </>

  );
};

export default NewMeal;
