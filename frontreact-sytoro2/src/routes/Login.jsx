import axios from "axios";
import { useState } from "react";
import useStoreContext from "../context/StoreProvider";
import { toast } from "react-toastify";
import getError from "../utils/getError";

const Login = () => {
	"http://localhost:3000/api/users/login";

	const { dispatch } = useStoreContext();

	const [rut, setRut] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();


		if ([rut, password].includes("")) {
			return toast.warning("Todos los Campos son Requeridos");
		}

		try {
			const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, { rut, password });
			toast.success("Usuario Autenticado");
			dispatch({ type: "login user", payload: data });
		} catch (error) {
			toast.error(getError(error));
		}
	};

	return (
		<div>
			<div className="row justify-content-center">
				<div className="col-md-6 mt-5">
					<div className="card shadow">
						<div className="card-header bg-primary text-white">
							<h4 className="mb-0">Inicio de Sesión</h4>
						</div>
						<div className="card-body">
							<div className="text-center my-4">
								<img
									src="https://c8.alamy.com/compes/2ah6rge/real-estate-company-logo-design-template-oro-edificio-concepto-logotipo-propiedad-de-lujo-construccion-elemento-de-arquitectura-apartamento-condominio-alquiler-2ah6rge.jpg"
									alt="Logo"
									className="img-fluid rounded-circle"
									style={{ width: "80px", height: "80px" }}
								/>
							</div>

							<form onSubmit={handleSubmit}>
								<div className="form-group mb-3">
									<label htmlFor="inputRut" className="mb-2 fw-bold">
										Rut
									</label>
									<input
										type="text"
										className="form-control"
										id="inputRut"
										placeholder="Ingresa tu Rut"
										onChange={(e) => setRut(e.target.value)}
									/>
								</div>
								<div className="form-group mb-3">
									<label
										htmlFor="exampleInputPassword1"
										className="mb-2 fw-bold"
									>
										Contraseña
									</label>
									<input
										type="password"
										className="form-control"
										id="exampleInputPassword1"
										placeholder="Contraseña"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								<button type="submit" className="btn btn-primary mt-3">
									Iniciar Sesión
								</button>
							</form>
						</div>
						<div className="card-footer text-muted text-center">
							¿No tienes una cuenta?
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
