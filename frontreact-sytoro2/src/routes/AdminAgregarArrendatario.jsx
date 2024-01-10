import { useEffect, useState } from "react";

import useStoreContext from "../context/StoreProvider";
import axios from "axios";
import FormCreateArrendatario from "../components/FormCreateArrendatario";
import AdminGetArrendatarios from "../components/AdminGetArrendatarios";

const AdminAgregarArrendatario = () => {
	const { state } = useStoreContext();
	const [hideForm, setHideForm] = useState(false);

	const [arrendatarios, setArrendatarios] = useState([]);

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const url = `${import.meta.env.VITE_BASE_URL}/api/arrendatario/all-arrendatarios`;
				const config = {
					headers: { Authorization: `Bearer ${state.userInfo.token}` },
				};

				const { data } = await axios.get(url, config);
				setArrendatarios(data);
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
			{hideForm && <FormCreateArrendatario setArrendatarios={setArrendatarios} />}

			<AdminGetArrendatarios hideForm={hideForm} setHideForm={setHideForm} arrendatarios={arrendatarios} setArrendatarios={setArrendatarios} />
		</div>
	);
};

export default AdminAgregarArrendatario;
