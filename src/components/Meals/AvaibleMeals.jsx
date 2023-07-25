import classes from "./AvaibleMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvaibleMeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async function () {
      const response = await fetch(
        "https://realistic-example-483a6-default-rtdb.firebaseio.com/DUMMY_DATA.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      console.log(response);
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });

        setMeals(loadedMeals);
        setIsLoading(false);
      }
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  const mealsList = meals.map((meals) => {
    return (
      <MealItem
        id={meals.id}
        key={meals.id}
        name={meals.name}
        price={meals.price}
        description={meals.description}
      />
    );
  });

  if (isLoading) {
    return <p className={classes.paraf}>Loading.</p>;
  }

  if (error) {
    return <p className={classes.paraf1}>{error}</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvaibleMeals;
