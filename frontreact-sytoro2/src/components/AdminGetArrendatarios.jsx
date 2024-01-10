/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import getError from "../utils/getError";

import useStoreContext from "../context/StoreProvider";

import axios from "axios";

import { useState } from "react";
import ModalFormEditarArrendatario from "./ModalFormEditarArrendatario";

const AdminGetArrendatarios = ({arrendatarios,setArrendatarios,}) => {
	const { state } = useStoreContext();

	const [show, setShow] = useState(false)

	
	const [arrToUpdate, setArrToUpdate] = useState({});

	const handleDelete = async (id) => {
		try {
			const userConfirmed = window.confirm(
				"¿Estás seguro de que quieres eliminar este arrendatario?"
			);
			if (!userConfirmed) {
				// Si el usuario cancela la eliminación, no hacemos nada
				return;
			}

			const url = `${
				import.meta.env.VITE_BASE_URL
			}/api/arrendatario/delete-arrendatario/${id}`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};

			const { data } = await axios.delete(url, config);
			setArrendatarios(data); //aqui obtengo el nuevo listado desde el backend y actualizo la lista
			toast.success("Arrendatario Eliminado Correctamente");
		} catch (error) {
			toast.error(getError(error));
		}
	};

	const handleEditar = async (item) => {
		setArrToUpdate(item);
		setShow(!show)
	};

	//table table-bordered
	return (
		<div className="table-responsive mt-3">

		{
			show &&
		<ModalFormEditarArrendatario setArrendatarios={setArrendatarios} arrToUpdate={arrToUpdate} show={show} setShow={setShow} />
		}

			{arrendatarios.length == 0 && (
				<p className="text-center">No hay Arrendatarios</p>
			)}

			{arrendatarios.length > 0 && (
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Rut</th>
							<th>Email</th>
							<th>Apt.</th>
							<th>Estacio.</th>
							<th>Dueño.</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{arrendatarios.map((item) => (
							<tr key={item._id}>
								<td>{item.name}</td>
								<td>{item.rut}</td>
								<td>{item.email}</td>
								<td>{item.apartamento}</td>
								<td>{item.estacionamiento}</td>
								<td>{item.dueno}</td>
								<td>
									<button
										onClick={() => handleEditar(item)}
										type="button"
										className="btn btn-warning me-2"
									>
										Editar
									</button>
									<button
										onClick={() => handleDelete(item._id)}
										type="button"
										className="btn btn-danger"
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			
		</div>
	);
};

export default AdminGetArrendatarios;
