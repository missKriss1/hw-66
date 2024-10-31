import * as React from 'react';
import { useState } from 'react';
import { IMealsAdd } from '../../types';

interface Props {
  addNewMeal: (meal: IMealsAdd) => void;
  isEdit?: boolean;
}

const initialState: IMealsAdd = {
  meals: '',
  description: '',
  kcal: 0,
};

const MealForm: React.FC<Props> = ({ addNewMeal, isEdit }) => {
  const [newMeal, setNewMeal] = useState<IMealsAdd>(initialState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMeal((prevState) => ({
      ...prevState,
      [name]: name === 'kcal' ? Number(value) : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMeal.description.trim() !== '') {
      addNewMeal(newMeal);
    } else {
      alert("Заполните все поля корректно!");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>{isEdit ? 'Edit' : 'Add new'} meal</h3>
        <div className="form-group mb-2">
          <select
            id="meals"
            name="meals"
            onChange={handleInputChange}
            value={newMeal.meals}
            className="form-control"
          >
            <option value="">Select meal</option>
            <option value="breakfast">Breakfast</option>
            <option value="snack">Snack</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <label htmlFor="description">Meal Description:</label>
          <input
            type="text"
            onChange={handleInputChange}
            value={newMeal.description}
            id="description"
            name="description"
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="kcal">Kcal:</label>
          <input
            type="number"
            id="kcal"
            name="kcal"
            min={1}
            value={newMeal.kcal}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Edit' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default MealForm;
