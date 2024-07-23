import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../context/store'

const Recipe = () => {
	const { id } = useParams()

	const [meal, setMeal] = useState(null)

	const { setFavoriteMeals } = useStore()

	useEffect(() => {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
			.then((response) => response.json())
			.then((data) => setMeal(data.meals[0]))
			.catch((error) => console.error(error))
	}, [])

	const handleFavoriteToggle = () => {
		setMeal((prevMeal) => ({ ...prevMeal, favorite: !prevMeal.favorite }))

		if (!meal.favorite) {
			setFavoriteMeals((prev) => [...prev, { ...meal, favorite: true }])
		} else {
			setFavoriteMeals((prev) =>
				prev.filter((prevMeal) => prevMeal.idMeal !== meal.idMeal)
			)
		}
	}

	return (
		<>
			{meal && (
				<section className="max-w-7xl mx-auto px-2.5 md:px-7 my-10 grid md:grid-cols-2 gap-7 text-lg">
					<img
						src={meal.strMealThumb}
						alt={meal.strMeal}
						className="rounded-lg"
					/>

					<div className="space-y-3">
						<h2 className="text-5xl font-bold">{meal.strMeal}</h2>

						<div className="flex gap-3">
							<p className="px-3 py-1 bg-stone-900 rounded-md text-white">
								{meal.strCategory}
							</p>
							<p className="px-3 py-1 bg-stone-900 rounded-md text-white">
								{meal.strArea}
							</p>
							<button onClick={handleFavoriteToggle}>
								<Heart
									size={30}
									className={`text-red-600 ${
										meal.favorite ? 'fill-red-600' : ''
									}`}
								/>
							</button>
						</div>

						<p>{meal.strInstructions}</p>

						<p className="font-medium space-x-1.5">
							<span className="text-xl">Video Tutorial:</span>
							<a
								href={meal.strYoutube}
								target="_blank"
								className="text-violet-600 hover:text-violet-900 transition duration-300"
							>
								{meal.strYoutube}
							</a>
						</p>

						<h4 className="text-2xl font-medium">Ingredients:</h4>

						<ol className="space-y-1.5">
							{Array(20)
								.fill()
								.map( 
									(_, index) =>
										meal[`strIngredient${index}`] && (
											<li key={index}>
												<span className="font-medium">
													{meal[`strMeasure${index}`]}
												</span>{' '}
												{meal[`strIngredient${index}`]}
											</li>
										)
								)}
						</ol>
					</div>
				</section>
			)}
		</>
	)
}
export default Recipe
