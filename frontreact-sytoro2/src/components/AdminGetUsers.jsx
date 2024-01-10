/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import getError from "../utils/getError";

import useStoreContext from "../context/StoreProvider";

import axios from "axios";


const AdminGetUsers = ({ users ,setUsers}) => {
	const { state } = useStoreContext();

	const handleDelete = async (id) => {
		try {
      const userConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
      if (!userConfirmed) {
        // Si el usuario cancela la eliminación, no hacemos nada
        return;
      }

			const url = `${
				import.meta.env.VITE_BASE_URL
			}/api/users/delete-conserje/${id}`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};

			const { data } = await axios.delete(url, config);
      setUsers(data) //aqui obtengo el nuevo listado desde el backend y actualizo la lista
			toast.success('Usuario Eliminado Correctamente');
		} catch (error) {
			toast.error(getError(error));
		}
	};

	//table table-bordered
	return (
		<div className="table-responsive mt-3">
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						<th>Name</th>
						<th>Rut</th>
						<th>Email</th>
						<th>Password</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					{users.map((item) => (
						<tr key={item._id}>
							<td>{item.name}</td>
							<td>{item.rut}</td>
							<td>{item.email}</td>
							<td>{item.password}</td>
							<td>{item.role}</td>
							<td>
								{/* <button type="button" className="btn btn-warning me-2">
									Editar
								</button> */}
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
		</div>
	);
};

export default AdminGetUsers;
