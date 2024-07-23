import MealCard from '../components/MealCard'
import useStore from '../context/store'

const Favorites = () => {
	const { favoriteMeals, setFavoriteMeals } = useStore()

	const handleFavoriteToggle = (mealId) => {
		setFavoriteMeals((prevMeals) =>
			prevMeals.map((meal) =>
				meal.idMeal === mealId ? { ...meal, favorite: !meal.favorite } : meal
			)
		)

		const toggledMeal = favoriteMeals.find((meal) => meal.idMeal === mealId)
		if (toggledMeal) {
			if (!toggledMeal.favorite) {
				setFavoriteMeals((prev) => [...prev, toggledMeal])
			} else {
				setFavoriteMeals((prev) =>
					prev.filter((meal) => meal.idMeal !== toggledMeal.idMeal)
				)
			}
		}
	}

	return (
		<section className="max-w-7xl mx-auto px-2.5 md:px-7 flex gap-7 flex-wrap justify-center items-center my-10">
			{favoriteMeals.length > 0 ? (
				favoriteMeals.map((meal) => (
					<MealCard
						key={meal.idMeal}
						meal={meal}
						handleFavoriteToggle={handleFavoriteToggle}
					/>
				))
			) : (
				<h1 className="font-bold text-4xl">Your Favorites is Empty!</h1>
			)}
		</section>
	)
}
export default Favorites
