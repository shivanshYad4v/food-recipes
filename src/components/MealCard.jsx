import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const MealCard = ({ meal, handleFavoriteToggle }) => {
	return (
		<div className="p-4 rounded-lg border-2 space-y-3 w-56">
			<img
				src={meal.strMealThumb}
				alt={meal.strMeal}
				className="rounded-lg"
				loading="lazy"
			/>

			<h4 className="text-xl font-medium truncate">{meal.strMeal}</h4>

			<div className="flex justify-between items-center">
				<Link
					to={`/recipe/${meal.idMeal}`}
					className="bg-stone-900 py-1 px-3 text-white rounded-md hover:bg-stone-700 transition duration-300"
				>
					Recipe Details
				</Link>
				<button onClick={() => handleFavoriteToggle(meal.idMeal)}>
					<Heart
						className={`text-red-600 ${meal.favorite ? 'fill-red-600' : ''}`}
					/>
				</button>
			</div>
		</div>
	)
}
export default MealCard
