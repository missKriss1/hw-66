import { IMeals } from '../../types';
import * as React from 'react';
import { NavLink } from 'react-router-dom';


interface Props {
  meal: IMeals;
  onDeleteMeal: React.MouseEventHandler
}
const MealItem: React.FC <Props> = ({meal, onDeleteMeal}) => {
  return (
    <div className="border border-gray m-4 p-4">
      <div className="row">
        <div className="col-4">
          <h5>{meal.meals}</h5>
          <hr/>
          <strong>{meal.description}</strong>
        </div>
        <div className="col-4 mt-4">
          <p>{meal.kcal} kcal</p>
        </div>
        <div className="col-4">
          <div>
            <button className="btn btn-close ms-3" onClick={onDeleteMeal}></button>
          </div>
          <div>
            <button className="btn-primary btn ">
              <NavLink className="text-white text-decoration-none" to={`/editMeal/${meal.id}`}>Edit</NavLink>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MealItem;