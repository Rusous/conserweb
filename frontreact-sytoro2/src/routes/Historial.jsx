/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import useStoreContext from "../context/StoreProvider";
import formatFecha from "../utils/formatDate";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import getError from "../utils/getError";

function MyVerticallyCenteredModal(props) {
	const { state } = useStoreContext();

	const [nota, setNota] = useState(""); //aqui guardo la nota cargada de la busqueda

	useEffect(() => {
		const obtnerHistorial = async () => {
			try {
				const url = `${import.meta.env.VITE_BASE_URL}/api/notas/buscar-nota/${
					props.mencion
				}`;
				const config = {
					headers: { Authorization: `Bearer ${state.userInfo.token}` },
				};

				const { data } = await axios.get(url, config);

				setNota(data.nota);
			} catch (error) {
				console.log(error)
			}
		};

		obtnerHistorial();
	}, []);

	const modules = {
		toolbar: false, // Desactivar la barra de herramientas
	};
	const quillStyle = {
		maxHeight: "50vh", // Establece la altura máxima según tus necesidades
		overflowY: "auto", // Puede ser 'auto' o 'scroll'
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{formatFecha(props.mencion)}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<h4>Historial de ese dia</h4>

				<ReactQuill
					value={nota}
					readOnly={true}
					theme="snow"
					modules={modules}
					style={quillStyle}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

const Historial = () => {
	const { state } = useStoreContext();
	const [buscar, setBuscar] = useState("");
	const [menciones, setMenciones] = useState([]);
	const [mencion, setMencion] = useState("");
	const [filtro, setFiltro] = useState("");

	const [modalShow, setModalShow] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const url = `${import.meta.env.VITE_BASE_URL}/api/arrendatario/buscar`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			}; 

			const { data } = await axios.post(url, { buscar,filtro }, config);

			setMenciones(data?.menciones);
		} catch (error) {
			toast.warn(getError(error))
			setMenciones([])
			
		} 
	};

	//esto pasa cuando se da click en una fecha de la lista de resultados
	const handleMenciones = (item) => {
		setModalShow(true);
		setMencion(item);
		
	};

	return (
		<div className="border d-flex flex-column align-items-center justify-content-center">
			<h3 className="my-3">Historial</h3>

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

			{menciones?.length > 0 ? (
				<div className="mt-4">
					<h3>Fue Mencionado el:</h3>
					<ul className="list-group">
						{menciones?.map((item) => (
							<li
								className="list-group-item cursor-pointer border-3"
								key={item}
								onClick={() => handleMenciones(item)}
							>
								{formatFecha(item)}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="mt-4">
					<p>No hay resultado de busqueda!</p>
				</div>
			)}

			{modalShow && (
				<MyVerticallyCenteredModal
					show={modalShow}
					mencion={mencion}
					onHide={() => setModalShow(false)}
				/>
			)}
		</div>
	);
};

export default Historial;
