import { useEffect, useState } from "react";
import AdminGetUsers from "../components/AdminGetUsers";
import FormCreateConserje from "../components/FormCreateConserje";

import useStoreContext from "../context/StoreProvider";
import axios from "axios";

const AdminAgregarConserje = () => {
	const { state } = useStoreContext();
	const [hideForm, setHideForm] = useState(false);

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const url = `${import.meta.env.VITE_BASE_URL}/api/users/all-users`;
				const config = {
					headers: { Authorization: `Bearer ${state.userInfo.token}` },
				};

				const { data } = await axios.get(url, config);
				setUsers(data);
			} catch (error) {
				console.log(error);
			}
		};

		getAllUsers();
	}, [state.userInfo.token]);

	return (
		<div className="mt-2">
			<button
				className="btn btn-primary"
				onClick={() => setHideForm(!hideForm)}
			>
				{hideForm ? "Ocultar form" : "Mostrar form"}
			</button>
			{hideForm && <FormCreateConserje setUsers={setUsers}/>}

			<AdminGetUsers users={users} setUsers={setUsers} />
		</div>
	);
};

export default AdminAgregarConserje;
