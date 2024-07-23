import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => (
	<footer className="max-w-7xl mx-auto p-2.5 md:px-7 flex justify-between items-center">
		<p className="text-lg font-medium">
			&copy; Copyright {new Date().getFullYear()}. All Rights Reserved.
		</p>

		<div className="flex gap-3">
			<Link to="/" className="bg-black p-2 rounded-md">
				<Instagram size={25} color="white" />
			</Link>
			<Link to="/" className="bg-black p-2 rounded-md">
				<Facebook size={25} color="white" />
			</Link>
			<Link to="/" className="bg-black p-2 rounded-md">
				<Twitter size={25} color="white" />
			</Link>
		</div>
	</footer>
)

export default Footer
