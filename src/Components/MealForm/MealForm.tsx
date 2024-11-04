import * as React from 'react';
import { useEffect, useState } from 'react';
import { IMealsAdd } from '../../types';

interface Props {
  addNewMeal: (meal: IMealsAdd) => void;
  isEdit?: boolean;
  meal?: IMealsAdd;
}

const MealForm: React.FC<Props> = ({ addNewMeal, isEdit, meal }) => {
  const initialState = {
    meals: meal?.meals || '',
    description: meal?.description || '',
    kcal: meal?.kcal || 0,
  };
  const [newMeal, setNewMeal] = useState<IMealsAdd>(initialState);

  useEffect(() => {
    if(isEdit && meal){
      setNewMeal(meal);
    }
  }, [isEdit, meal]);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMeal((prevState) => ({
      ...prevState,
      [name]: name === 'kcal' ? Number(value) : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeal.description.trim() !== '' && newMeal.meals.trim() !== '') {
      addNewMeal(newMeal);
    } else {
      alert("Fill in the blanks");
    }
  };

  return (
    <div className="container w-50 mt-5">
      <form onSubmit={onSubmit}>
        <h3>{isEdit ? 'Edit' : 'Add new'} meal</h3>
        <div className="form-group mt-4">
          <select
            id="meals"
            name="meals"
            onChange={inputChange}
            value={newMeal.meals}
            className="form-control mt-3"
          >
            <option value="">Select meal</option>
            <option value="breakfast">Breakfast</option>
            <option value="snack">Snack</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <label className="mt-3">Meal Description:</label>
          <input
            type="text"
            onChange={inputChange}
            value={newMeal.description}
            id="description"
            name="description"
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <label className="mt-3">Kcal:</label>
          <input
            type="number"
            id="kcal"
            name="kcal"
            min={1}
            value={newMeal.kcal}
            onChange={inputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 d-flex align-items-center">
         <span className="me-2">{isEdit ? 'Edit' : 'Add'}</span>
        </button>
      </form>
    </div>
  );
};

export default MealForm;
