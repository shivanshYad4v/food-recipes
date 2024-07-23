import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Favorites from './Pages/Favorites'
import Home from './Pages/Home'
import Layout from './Pages/Layout'
import Recipe from './Pages/Recipe'
import { StoreProvider } from './context/store'

const App = () => {
	return (
		<StoreProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/recipe/:id" element={<Recipe />} />
						<Route path="/favorites" element={<Favorites />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</StoreProvider>
	)
}
export default App
