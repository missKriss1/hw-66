import ToolBar from "./Components/TollBar/TollBar.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Container/Home/Home.tsx";
import NewMeal from "./Container/NewMeal/NewMeal.tsx";
import { useCallback, useEffect, useState } from "react";
import { IMeals } from "./types";
import axoisApi from "./axoisApi.ts";
import EditMeal from "./Container/EditMeal/EditMeal.tsx";

const App = () => {
  const [meals, setMeals] = useState<IMeals[]>([]);
  const location = useLocation();

  const fetchMeals = useCallback(async () => {
    try {
      const response = await axoisApi.get("meals.json");
      const mealsList = response.data;
      console.log(mealsList);

      if (mealsList) {
        const mealsInMyFormat = Object.keys(mealsList).map((mealId) => ({
          ...mealsList[mealId],
          id: mealId,
        }));
        setMeals(mealsInMyFormat);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      void fetchMeals();
    }
  }, [fetchMeals, location.pathname]);

  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home meals={meals} fetchMeals={fetchMeals} />}
          />
          <Route
            path="/newMeal"
            element={<NewMeal fetchMeals={fetchMeals} />}
          />
          <Route path="/editMeal/:id" element={<EditMeal />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
