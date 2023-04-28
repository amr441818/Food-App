import { useEffect, useState } from "react";
import Card from "../Ui/Card/Card";
import classes from "./Available.module.css";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];
const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequst = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://reacthttp-15a58-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      console.log(data);
      let loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMealsData(loadedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    sendRequst();
  }, []);
  const mealsList = mealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  let theError;
  if (error) {
    theError = (
      <section>
        <p className={classes.errorText}>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading ? <p className={classes.isLoading}>Loading....</p> : ""}
        {theError}
        <ul> {mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
