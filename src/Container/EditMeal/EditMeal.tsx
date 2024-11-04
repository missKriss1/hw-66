import MealForm from "../../Components/MealForm/MealForm.tsx";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../../axoisApi.ts";
import { IMeals, IMealsAdd } from "../../types";
import Spinner from "../../UI/Spinner/Spinner.tsx";

const EditMeal = () => {
  const [meal, setMeal] = useState<IMeals | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getOneMealById = useCallback(async () => {
    const response = await axiosApi.get<IMeals>(`/meals/${id}.json`);
    if (response.data) {
      setMeal(response.data);
    }
  }, [id]);

  useEffect(() => {
    void getOneMealById();
  }, [getOneMealById]);

  const addNewMeal = async (meal: IMealsAdd) => {
    setLoading(true);
    try {
      await axiosApi.put(`/meals/${id}.json`, meal);
      navigate(`/`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    meal && (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <MealForm addNewMeal={addNewMeal} isEdit={true} meal={meal} />
          </div>
        )}
      </>
    )
  );
};

export default EditMeal;
