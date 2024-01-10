/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import getError from "../utils/getError";
import useStoreContext from "../context/StoreProvider";

const FormCreateArrendatario = ({ setArrendatarios }) => {

  const { state } = useStoreContext();
  
	const [name, setName] = useState("");
	const [rut, setRut] = useState("");
	const [email, setEmail] = useState("");
	const [apartamento, setApartamento] = useState("");
	const [estacionamiento, setEstacionamiento] = useState("");
  const [dueno, setDueno] = useState('')
	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([name, rut, email, apartamento, estacionamiento, dueno].includes("")) {
			return toast.warn("Todos los campos son obligatorios");
		}

		try {
			const url = `${
				import.meta.env.VITE_BASE_URL
			}/api/arrendatario/create-arrendatario`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};
			const { data } = await axios.post(
				url,
				{ name, rut, email, apartamento, estacionamiento, dueno},
				config
			);
			setArrendatarios(data);
			toast.success("Arrendatario creado satisfactoriamente");
		} catch (error) {
			toast.error(getError(error));
		}

		setName("");
		setRut("");
		setEmail("");
		setApartamento("");
		setEstacionamiento("");
    setDueno('')
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

					<div className="mb-3 row">
						<div className="col-md-4">
							<label htmlFor="password" className="form-label">
								Apartamento
							</label>
							<input
								type="text"
								className="form-control"
								id="password"
								value={apartamento}
								onChange={(e) => setApartamento(e.target.value)}
							/>
						</div>

						<div className="col-md-4">
							<label htmlFor="estacionamiento" className="form-label">
								Estacionamiento
							</label>
							<input
								type="text"
								className="form-control"
								id="estacionamiento"
								value={estacionamiento}
								onChange={(e) => setEstacionamiento(e.target.value)}
							/>
						</div>

						<div className="col-md-4">
							<label htmlFor="estacionamiento" className="form-label">
								Dueño
							</label>
							{/* <input
								type="text"
								className="form-control"
								id="estacionamiento"
								value={estacionamiento}
								onChange={(e) => setEstacionamiento(e.target.value)}
							/> */}
							<select
              value={dueno}
                onChange={(e)=> setDueno(e.target.value)}
              >
								<option value=''>Selecione una opcion</option>
                <option value='si'>Si</option>
                <option value='no'>No</option>
							</select>
						</div>
					</div>

					<button type="submit" className="btn btn-primary">
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
};

export default FormCreateArrendatario;
