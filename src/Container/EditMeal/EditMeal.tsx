import MealForm from '../../Components/MealForm/MealForm.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axoisApi.ts';
import { IMeals, IMealsAdd } from '../../types';


const EditMeal = () => {
  const [meal, setMeal] = useState<IMeals | null>(null);
  const navigate = useNavigate();
  const {id} = useParams();

  const getOneMealById = useCallback(async () => {
    const response = await axiosApi.get<IMeals>(`/meals/${id}.json`);
    if(response.data){
      setMeal(response.data);
    }
  }, [id]);

  useEffect(() => {
    void getOneMealById();
  }, [getOneMealById]);

  const addNewMeal = async(meal: IMealsAdd) => {
    try{
      await axiosApi.put(`/meals/${id}.json`, meal);
      navigate(`/`);
    }catch (e) {
      console.error(e);
    }
  };
  return meal && (
    <div>
      <MealForm addNewMeal={addNewMeal} isEdit={true} meal={meal} />
    </div>
  );
};

export default EditMeal;