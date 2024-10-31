import { IMeals } from '../../types';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import axiosApi from '../../axoisApi.ts';
import Meals from '../../Components/Meals/Meals.tsx';

interface Props {
  meals : IMeals[];
  fetchMeals :() => void;
}

const Home: React.FC <Props> = ({meals, fetchMeals}) => {

  const delateMeal = useCallback(async (id: string) =>{
    try{
      await axiosApi.delete(`meals/${id}.json`);
      await fetchMeals();
    }catch (e) {
      console.error(e);
    }
  }, [fetchMeals]);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  return (
    <div>
      <div className="row justify-content-between">
        <div className="col col-md-5 mb-2">
          {meals.length > 0 ?
            <Meals meals={meals}  delateMeal={delateMeal}/>
            : <p>Not dishes yet</p>
          }
        </div>
      </div>
      </div>
      );
      };

      export default Home;