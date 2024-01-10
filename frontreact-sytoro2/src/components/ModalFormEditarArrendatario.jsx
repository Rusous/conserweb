/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import useStoreContext from "../context/StoreProvider";
import axios from "axios";
import getError from "../utils/getError";

function ModalFormEditarArrendatario({ show, setShow, arrToUpdate,setArrendatarios }) {
	const { state } = useStoreContext();

	const [name, setName] = useState(arrToUpdate.name || '');
	const [rut, setRut] = useState(arrToUpdate.rut || '');
	const [email, setEmail] = useState(arrToUpdate.email || '');
	const [apartamento, setApartamento] = useState(arrToUpdate.apartamento || '');
	const [estacionamiento, setEstacionamiento] = useState(arrToUpdate.estacionamiento || '');
	const [dueno, setDueno] = useState(arrToUpdate.dueno || '');

	const handleClose = () => setShow(false);

	const handleSubmit = async () => {
		if ([name, rut, email, apartamento, estacionamiento, dueno].includes("")) {
			return toast.warn("Todos los campos son obligatorios");
		}

		try {
			const url = `${
				import.meta.env.VITE_BASE_URL
			}/api/arrendatario/editar-arrendatario/${arrToUpdate._id}`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};
			
			const { data } = await axios.put(
				url,
				{ name, rut, email, apartamento, estacionamiento, dueno },
				config
			);

			setArrendatarios(data)
			// setArrendatarios(data);
			toast.success("Arrendatario creado satisfactoriamente");
		} catch (error) {
			toast.error(getError(error));
		}finally{
			setName("");
			setRut("");
			setEmail("");
			setApartamento("");
			setEstacionamiento("");
			setDueno("");
			setShow(!show)
		}

	};
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Formulario de Edicion</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row justify-content-center mt-2">
						<div className="col-md-12 border p-4">
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

									<select
										className="w-100"
										value={dueno}
										onChange={(e) => setDueno(e.target.value)}
									>
										<option value="">Selecione una opcion</option>
										<option value="si">Si</option>
										<option value="no">No</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalFormEditarArrendatario;
