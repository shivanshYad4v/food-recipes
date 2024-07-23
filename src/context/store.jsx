import { createContext, useContext, useState } from 'react'

const Store = createContext()

export function StoreProvider({ children }) {
	const [favoriteMeals, setFavoriteMeals] = useState([])
	const [selectedOption, setSelectedOption] = useState({ area: 'Indian' })

	return (
		<Store.Provider
			value={{
				favoriteMeals,
				setFavoriteMeals,
				selectedOption,
				setSelectedOption,
			}}
		>
			{children}
		</Store.Provider>
	)
}

export default function useStore() {
	return useContext(Store)
}
