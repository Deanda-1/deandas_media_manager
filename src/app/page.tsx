import PublicLayout from './(public)/layout'
import Home from './(public)/page'

export default function RootPage() {
	// Render the public home page within the public shell so header/footer show up
	return (
		<PublicLayout>
			<Home />
		</PublicLayout>
	)
}
