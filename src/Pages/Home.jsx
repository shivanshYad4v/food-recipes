import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";
import useStore from "../context/store";

const Home = () => {
  const [meals, setMeals] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { setFavoriteMeals, selectedOption } = useStore();

  useEffect(() => {
    let url;
    if (Object.keys(selectedOption)[0] === "category") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedOption.category}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedOption.area}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMeals(data.meals))
      .catch((error) => console.error(error));
  }, [selectedOption]);

  const handleFavoriteToggle = (mealId) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.idMeal === mealId ? { ...meal, favorite: !meal.favorite } : meal
      )
    );

    const toggledMeal = meals.find((meal) => meal.idMeal === mealId);
    if (toggledMeal) {
      if (!toggledMeal.favorite) {
        setFavoriteMeals((prev) => [
          ...prev,
          { ...toggledMeal, favorite: true },
        ]);
      } else {
        setFavoriteMeals((prev) =>
          prev.filter((meal) => meal.idMeal !== toggledMeal.idMeal)
        );
      }
    }
  };

  return (
    <section className="my-10 max-w-7xl mx-auto px-2.5 md:px-7 space-y-7">
      <div className="flex gap-3 border-2 px-3 py-2 rounded-md max-w-72 mx-auto">
        <Search className="text-gray-300" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-7 flex-wrap justify-center">
        {meals && meals.filter((meal) => meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                handleFavoriteToggle={handleFavoriteToggle}
              />
            ))}
      </div>
    </section>
  );
};
export default Home;
