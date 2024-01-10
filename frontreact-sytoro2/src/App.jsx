import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { StoreProvider } from "./context/StoreProvider";

//paginas publicas
import Root from "./routes/Root";
import Login from "./routes/Login";

// paginas privadas
import Homepage from "./routes/Homepage";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublitRoute";
import AdminAgregarConserje from "./routes/AdminAgregarConserje";
import AdminRoute from "./components/auth/AdminRoute";
import AdminAgregarArrendatario from "./routes/AdminAgregarArrendatario";
import Historial from "./routes/Historial";
import UsuarioSearch from "./routes/UsuarioSearch";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: (
					<PublicRoute>
						{" "}
						<Login />{" "}
					</PublicRoute>
				),
			},

			{
				path: "/homepage",
				element: (
					<PrivateRoute>
						{" "}
						<Homepage />{" "}
					</PrivateRoute>
				),
			},

			{
				path:'/historial',
				element:(
					<PrivateRoute>
						<Historial />
					</PrivateRoute>
				)	
			},

			{
				path:'/usuarios',
				element:(
					<PrivateRoute>
						<UsuarioSearch />
					</PrivateRoute>
				)	
			},

			//solo admins
			{
				path: "/admin/agregar-conserje",
				element: (
					<AdminRoute>
						<AdminAgregarConserje />
					</AdminRoute>
				),
			},


			{
				path:'/admin/agregar-arrendatario',
				element: <AdminRoute><AdminAgregarArrendatario/></AdminRoute>
			}
		],
	},
]);

function App() {

	return (
		<>

			<StoreProvider>
				<RouterProvider router={router} />
			</StoreProvider>
		</>
	);
}

export default App;
