/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import getError from "../utils/getError";
import useStoreContext from "../context/StoreProvider";

const FormCreateConserje = ({ setUsers }) => {
	const { state } = useStoreContext();

	const [name, setName] = useState("");
	const [rut, setRut] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([name, rut, email, password].includes("")) {
			return toast.warn("todos los campos obligatorios");
		}

		try {
			const url = `${import.meta.env.VITE_BASE_URL}/api/users/create-user`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};
			const { data } = await axios.post(
				url,
				{ name, rut, email, password },
				config
			);
			toast.success("Usuario creado Sactifactoriamente");
			setUsers(data);
		} catch (error) {
			toast.error(getError(error));
		}

		setName("");
		setRut("");
		setEmail("");
		setPassword("");
	};

	return (
		<div className="row justify-content-center mt-2">
			<div className="col-md-6">
				<form onSubmit={handleSubmit} className="border p-4">
					<div className="mb-3">
						<label htmlFor="name" className="form-label">
							Nombre
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="rut" className="form-label">
							Rut
						</label>
						<input
							type="text"
							className="form-control"
							id="rut"
							value={rut}
							onChange={(e) => setRut(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="email" className="form-label">
							Correo Electrónico
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="mb-3">
						<label htmlFor="password" className="form-label">
							Contraseña
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
};

export default FormCreateConserje;
