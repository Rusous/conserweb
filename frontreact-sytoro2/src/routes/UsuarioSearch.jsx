/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import useStoreContext from "../context/StoreProvider";

import { toast } from "react-toastify";
import getError from "../utils/getError";

const UsuarioSearch = () => {
	const { state } = useStoreContext();
	const [buscar, setBuscar] = useState("");
	const [usuario, setUsuario] = useState({});

	const [filtro, setFiltro] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const url = `${import.meta.env.VITE_BASE_URL}/api/arrendatario/buscar`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};
			// 

			const { data } = await axios.post(url, { buscar, filtro }, config);
			setUsuario(data);
		} catch (error) {
			toast.warn(getError(error));
			setUsuario([]);
			
		}
	};

	return (
		<div className="border d-flex flex-column align-items-center justify-content-center">
			<h3 className="my-3">Buscar Usuarios</h3>

			<select
				className="form-select me-2 w-auto mb-2"
				onChange={(e) => setFiltro(e.target.value)}
			>
				<option value="">Filtrar por</option>
				<option value="name">Nombre</option>
				<option value="rut">RUT</option>
				<option value="apartamento">Dpto.</option>
				<option value="estacionamiento">Est.</option>
			</select>

			<form className=" d-flex align-items-center" onSubmit={handleSubmit}>
				<input
					className="form-control mr-sm-2"
					type="search"
					placeholder="busca (nombre por defecto)"
					onChange={(e) => setBuscar(e.target.value)}
				/>

				<button
					className="btn btn-outline-success my-2 ms-2 my-sm-0"
					type="submit"
				>
					Buscar
				</button>
			</form>

			{usuario?.name ? (
				<div className="mt-4">
					<div className="bg-success text-white py-4 px-5 rounded">
						<h4>Arrendatario Info:</h4>
						<ul className="list-group">
							<li>
								<span className="fw-bold">Nombre:</span> {usuario.name}
							</li>

							<li>
								<span className="fw-bold">Rut:</span> {usuario.rut}
							</li>
							<li>
								<span className="fw-bold">Email:</span> {usuario.email}
							</li>
							<li>
								<span className="fw-bold">departamento:</span> {usuario.apartamento}
							</li>
							<li>
								<span className="fw-bold">Estacionamiento:</span> {usuario.estacionamiento}
							</li>
							<li>
								<span className="fw-bold">Dueño:</span> {usuario.dueno}
							</li>
						</ul>
					</div>
				</div>
			) : (
				<div className="mt-4">
					<p>No hay resultado de busqueda!</p>
				</div>
			)}
		</div>
	);
};

export default UsuarioSearch;
