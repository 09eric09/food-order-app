import React, {useEffect, useState} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let fetchedMeals = [];

    fetch(`https://food-order-app-2e7ec-default-rtdb.firebaseio.com/meals.json`)
    .then(res => res.json())
    .then(data => {
      
      for (const key in data) {
        let item = {
          id: key,
          name: data[key].name,
          description: data[key].description, 
          price: data[key].price
        }

        fetchedMeals.push(item);
        setMeals(fetchedMeals);
      }
    });
  }, []);

  return (
    <section className={classes.meals}>
      <Card>
      <ul>
        {meals.map(meal => <MealItem key={meal.id} id={meal.id} meal={meal}/>)}
      </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;