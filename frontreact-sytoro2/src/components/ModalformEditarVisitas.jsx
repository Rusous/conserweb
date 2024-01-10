/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import useStoreContext from "../context/StoreProvider";

import axios from "axios";

function ModalformEditarVisitas({
	show,
	setShow,
	visitaToUpdate,
	selecteddate,
	setVisitasArrCtx,
	setIsNotasview,
	isNotasView,
}) {
	const { state, setModalShowCtx, modalShowCtx } = useStoreContext();

	const [nombreV, setNombreV] = useState(visitaToUpdate.nombreV || "");
	const [rutV, setRutV] = useState(visitaToUpdate.rutV || "");
	const [deptoV, setDeptoV] = useState(visitaToUpdate.deptoV || "");
	const [estV, setEstV] = useState(visitaToUpdate.estV || "");
	const [patenteV, setPatenteV] = useState(visitaToUpdate.patenteV || "");
	const [horaInV, setHoraInV] = useState(visitaToUpdate.horaInV || "");
	const [horaOutV, setHoraOutV] = useState(visitaToUpdate.horaOutV || "");
	const [conserjeV, setConserjeV] = useState(visitaToUpdate.conserjeV || "");

	const handleClose = () => setShow(false);
	//   const handleShow = () => setShow(true);

	const handleEditar = async () => {
		if ([nombreV, rutV].includes("")) {
			toast.warning("Nombre y Rut son Obligatorios");
			return;
		}

		try {
			const url = `${import.meta.env.VITE_BASE_URL}/api/notas/editar-visita/${
				selecteddate._id
			}/${visitaToUpdate.idV}`;

			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};

			const { data } = await axios.put(
				url,
				{ nombreV, rutV, deptoV, estV, patenteV, horaInV, horaOutV, conserjeV },
				config
			);

			setVisitasArrCtx(data);
		} catch (error) {
			console.log(error);
		} finally {
			setShow(!show);
			setIsNotasview(!isNotasView);
			setModalShowCtx(!modalShowCtx);
		}
	};

	return (
		<>
			<Modal
				className="bg-dark bg-opacity-75"
				show={show}
				onHide={handleClose}
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Modal Editar Visitas</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div className="mb-3">
							<label htmlFor="nombre" className="form-label">
								Nombre:
							</label>
							<input
								type="text"
								className="form-control border border-3"
								id="nombre"
								value={nombreV}
								onChange={(e) => setNombreV(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="rut" className="form-label">
								Rut:
							</label>
							<input
								type="text"
								className="form-control border border-3"
								id="rut"
								value={rutV}
								onChange={(e) => setRutV(e.target.value)}
							/>
						</div>

						<div className="mb-3 row">
							<div className="col-md-6">
								<label htmlFor="departamento" className="form-label ">
									Departamento:
								</label>
								<input
									type="text"
									className="form-control border border-3"
									id="departamento"
									value={deptoV}
									onChange={(e) => setDeptoV(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="estacionamiento" className="form-label">
									Estacionamiento:
								</label>
								<input
									type="text"
									className="form-control border border-3"
									id="estacionamiento"
									value={estV}
									onChange={(e) => setEstV(e.target.value)}
								/>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="patente" className="form-label">
								Patente:
							</label>
							<input
								type="text"
								className="form-control border border-3"
								id="patente"
								value={patenteV}
								onChange={(e) => setPatenteV(e.target.value)}
							/>
						</div>

						<div className="mb-3 row">
							<div className="col-md-6">
								<label htmlFor="horaIN" className="form-label ">
									Hora entrada:
								</label>
								<input
									type="text"
									className="form-control border border-3"
									id="horaIN"
									value={horaInV}
									onChange={(e) => setHoraInV(e.target.value)}
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="horaOut" className="form-label">
									Hora Salida:
								</label>
								<input
									type="text"
									className="form-control border border-3"
									id="horaOut"
									value={horaOutV}
									onChange={(e) => setHoraOutV(e.target.value)}
								/>
							</div>
						</div>

						<div className="mb-3">
							<label htmlFor="conserjev" className="form-label">
								Conserje:
							</label>
							<input
								type="text"
								className="form-control border border-3"
								id="conserjev"
								value={conserjeV}
								onChange={(e) => setConserjeV(e.target.value)}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>

					<Button variant="primary" onClick={handleEditar}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalformEditarVisitas;
