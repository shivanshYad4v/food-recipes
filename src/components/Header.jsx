import { Heart, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../context/store'

const Header = () => {
	const { favoriteMeals, selectedOption, setSelectedOption } = useStore()
	const [showOptions, setShowOptions] = useState(false)
	const [areas, setAreas] = useState(null)
	const [categories, setCategories] = useState(null)

	useEffect(() => {
		fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
			.then((response) => response.json())
			.then((data) => setCategories(data.meals))
			.catch((error) => console.error(error))

		fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
			.then((response) => response.json())
			.then((data) => setAreas(data.meals))
			.catch((error) => console.error(error))
	}, [])

	const RenderOptions = ({ title, value }) => {
		return (
			<div className="pl-5 space-x-1">
				<input
					type="radio"
					id={value}
					name="option"
					value={value}
					checked={Object.values(selectedOption)[0] === value}
					onChange={(e) => setSelectedOption({ [title]: e.target.value })}
				/>
				<label htmlFor={value}>{value}</label>
			</div>
		)
	}

	return (
		<header className="shadow border-b">
			<div className="max-w-7xl mx-auto p-2.5 md:px-7 flex justify-between items-center">
				<button onClick={() => setShowOptions((prev) => !prev)}>
					<Menu size={35} />
				</button>
				
				{showOptions && (
					<aside className="fixed bg-white h-full top-0 left-0 w-56 p-5 text-lg overflow-y-scroll">
						<button onClick={() => setShowOptions((prev) => !prev)}>
							<X size={30} />
						</button>

						{categories && areas && (
							<>
								<h4 className="text-xl font-medium">Categories:</h4>

								{categories.map((category) => (
									<RenderOptions
										key={category.strCategory}
										title="category"
										value={category.strCategory}
									/>
								))}

								<h4 className="text-xl font-medium">Areas:</h4>

								{areas.map((area) => (
									<RenderOptions
										key={area.strArea}
										title="area"
										value={area.strArea}
									/>
								))}
							</>
						)}
					</aside>
				)}

				<Link to="/">
					<h1 className="text-3xl font-bold text-cyan-600">Food Recipe</h1>
				</Link>

				<Link to="/favorites" className="relative">
					<Heart size={35} className="fill-red-600" />
					<p className="size-5 grid place-content-center bg-black text-white font-medium rounded-full absolute -right-2 -top-1">
						{favoriteMeals.length}
					</p>
				</Link>
			</div>
		</header>
	)
}

export default Header
