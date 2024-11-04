import { IMeals } from "../../types";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonSpinner from "../../UI/ButtonSpinner/ButtonSpinner.tsx";

interface Props {
  meal: IMeals;
  onDeleteMeal: (id: string) => void;
}

const MealItem: React.FC<Props> = ({ meal, onDeleteMeal }) => {
  const [loadingDel, setLoadingDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onClickDel = async () => {
    setLoadingDel(true);
    try {
      await onDeleteMeal(meal.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDel(false);
    }
  };

  const onClickEdit = async () => {
    setLoading(true);
    try {
      navigate(`/editMeal/${meal.id}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border border-gray m-4 p-4">
      <div className="row">
        <div className="col-4">
          <h5 className="text-secondary">{meal.meals}</h5>
          <hr />
          <strong>{meal.description}</strong>
        </div>
        <div className="col-4 mt-4">
          <p>{meal.kcal} kcal</p>
        </div>
        <div className="col-4">
          <div>
            <button
              className="btn btn-close ms-3"
              onClick={onClickDel}
              disabled={loadingDel}
            >
              {loadingDel ? <ButtonSpinner /> : null}
            </button>
          </div>
          <div>
            <button
              className="btn-primary btn "
              onClick={onClickEdit}
              disabled={loading}
            >
              <NavLink
                className="text-white text-decoration-none"
                to={`/editMeal/${meal.id}`}
              >
                Edit
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
