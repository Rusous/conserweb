/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "react-big-calendar/lib/css/react-big-calendar.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import formatFecha from "../utils/formatDate";
import { useEffect, useState } from "react";
import useStoreContext from "../context/StoreProvider";
import axios from "axios";
import SelectUser from "./SelectUser";
import SelectApt from "./SelectApt";
import SelectEst from "./SelectEst";
import Visitas from "./Visitas";
import ModalCrearVisitas from "./ModalCrearVisitas";

import { utcToZonedTime } from "date-fns-tz";

function ModalCalendar(props) {
	const { state } = useStoreContext();
	const [contenidoTextarea, setContenidoTextarea] = useState("");

	const [showSelectUser, setShowSelectUser] = useState(false);
	const [showSelectApt, setShowSelectApt] = useState(false);
	const [showSelectEst, setShowSelectEst] = useState(false);

	const [getId, setGetid] = useState([]);

	const [isNotasView, setIsNotasview] = useState(true);
	const [showModalVisitas, setShowModalVisitas] = useState(false);

	let data = new Date(props.selecteddate.start || Date.now()); //obtengo la fecha para ingresar un saludo en el modal

	const selectedSlot = props.selecteddate.start; //lo necesito para bloquear el boton guardar en base al actual

	const isSlotInRange = (date) => {
		const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const currentDate = utcToZonedTime(new Date(), userTimeZone);
		const slotDate = utcToZonedTime(new Date(date), userTimeZone);

		const nextDay = new Date(currentDate.getTime() + 86400000);
		const previousDay = new Date(currentDate.getTime() - 86400000);

		const diaActual = currentDate.toLocaleDateString(undefined, {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});
		const diaSiguiente = nextDay.toLocaleDateString(undefined, {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});

		const diaAnterior = previousDay.toLocaleDateString(undefined, {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});

		const diaElegidoEnCalendario = slotDate.toLocaleDateString(undefined, {
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		});
		// Comprueba si la fecha del slot está dentro de un rango de un día antes y un día después del día actual
		return (
			diaElegidoEnCalendario >= diaAnterior &&
			diaElegidoEnCalendario <= diaSiguiente
		);
	};

	//este es para ver si hay notas, o esta vacio,, y tambien limpiar
	useEffect(() => {
		if (props.selecteddate.nota) {
			setContenidoTextarea(props.selecteddate.nota);
		} else {
			setContenidoTextarea("");
		}
	}, [props.selecteddate]);

	// Verificar si el nuevo contenido del textarea contiene la palabra 'user' y 'apt
	const handleTextArea = (value) => {
		const nuevoContenido = value;
		if (nuevoContenido.toLowerCase().includes("user. ")) {
			setShowSelectUser(true);
		} else if (nuevoContenido.toLowerCase().includes("dpto. ")) {
			setShowSelectApt(true);
		} else if (nuevoContenido.toLowerCase().includes("est. ")) {
			setShowSelectEst(true);
		} else {
			setShowSelectUser(false);
			setShowSelectApt(false);
			setShowSelectEst(false);
			// Si 'user' no está presente, simplemente actualizar el estado
			setContenidoTextarea(nuevoContenido);
		}
	};

	const quillModules = {
		toolbar: {
			container: [
				[{ font: [] }],
				[{ size: [] }],
				["bold", "italic", "underline", "strike", "blockquote"],
				[{ color: [] }, { background: [] }],
				[{ align: [] }],
				// [{ script: 'sub' }, { script: 'super' }],
				[{ list: "ordered" }, { list: "bullet" }],
				// ['link', 'image'],
				["clean"],
			],
		},
	};

	///// esto guara o edita las notas del dia seleccionado
	const handleGuardarEditar = async (visitaData) => {
		try {
			const url = `${import.meta.env.VITE_BASE_URL}/api/notas/crear-nota`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};

			const visit = [];

			//esto es para pasar las visitas si es que se agrega
			if (props.selecteddate._id && visitaData.nombreV) {
				visit.push(...props.selecteddate.visitas, visitaData);
			}
			if (!props.selecteddate._id && visitaData.nombreV) {
				visit.push(visitaData);
			}

			const { data } = await axios.post(
				url,
				{
					title: `click ver nota`,
					nota: contenidoTextarea,
					visitas: visit.length == 0 ? undefined : visit,
					start: props.selecteddate.start,
					end: props.selecteddate.end,
					_id: props.selecteddate._id ? props.selecteddate._id : undefined,
					arrendatariosIds: getId,
				},
				config
			);

			props.setEvents([...props.events, data]);
		} catch (error) {
			console.log(error);
		} finally {
			handleCloseX();
			setGetid([]);
		}
	};

	//esto pasa si se cierra el modal desde el boton
	const handleClosebutton = () => {
		props.onHide();
		setShowSelectUser(false);
		setIsNotasview(true);
	};

	//esto pasa si se cierra el modal de la x
	const handleCloseX = () => {
		setShowSelectUser(false);
		setShowSelectEst(false);
		setShowSelectEst(false);
		setIsNotasview(true);
		props.onHide();
	};

	return (
		<Modal
			{...props}
			size="xl"
			fullscreen="xl-down"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			backdrop="static"
			onHide={handleCloseX}
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{formatFecha(data)}
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				{isNotasView ? (
					<div>
						<h4>Ingresa tus notas</h4>

						{showSelectUser && (
							<SelectUser
								setGetid={setGetid}
								getId={getId}
								setShowSelectUser={setShowSelectUser}
								contenidoTextarea={contenidoTextarea}
								setContenidoTextarea={setContenidoTextarea}
							/>
						)}

						{showSelectApt && (
							<SelectApt
								setGetid={setGetid}
								getId={getId}
								setShowSelectApt={setShowSelectApt}
								contenidoTextarea={contenidoTextarea}
								setContenidoTextarea={setContenidoTextarea}
							/>
						)}

						{showSelectEst && (
							<SelectEst
								setGetid={setGetid}
								getId={getId}
								setShowSelectApt={setShowSelectEst}
								contenidoTextarea={contenidoTextarea}
								setContenidoTextarea={setContenidoTextarea}
							/>
						)}

						<ReactQuill
							theme="snow"
							preserveWhitespace
							value={contenidoTextarea}
							onChange={handleTextArea}
							modules={quillModules}
						/>
					</div>
				) : (
					<Visitas
						selecteddate={props.selecteddate}
						setIsNotasview={setIsNotasview}
						isNotasView={isNotasView}
					/>
				)}
			</Modal.Body>

			<Modal.Footer>
				{props.selecteddate._id && (
					<button
						className="btn btn-success"
						onClick={() => setIsNotasview(!isNotasView)}
					>
						{isNotasView ? "Gestionar Visitas" : "Gestionar Notas"}
					</button>
				)}

				<Button className="btn btn-danger" onClick={handleClosebutton}>
					Close
				</Button>

				{/* codigo de muestra boton guardar notas si estas en modo notas */}
				{isNotasView && selectedSlot && isSlotInRange(selectedSlot) && (
					<button className="btn btn-primary" onClick={handleGuardarEditar}>
						Guardar Notas
					</button>
				)}

				{/* {
          selectedSlot && isSlotInRange(selectedSlot) && (
            <button className="btn btn-primary" onClick={handleGuardarEditar}>
              Guardar Notas
            </button>
        )} */}

				{/* codigo de muestra boton crear visitas si estas en modo notas */}
				{!isNotasView && selectedSlot && isSlotInRange(selectedSlot) && (
					<button
						className="btn btn-primary"
						onClick={() => setShowModalVisitas(!showModalVisitas)}
					>
						Crear Visitas
					</button>
				)}

				<ModalCrearVisitas
					showModalVisitas={showModalVisitas}
					setShowModalVisitas={setShowModalVisitas}
					handleGuardarEditar={handleGuardarEditar}
				/>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalCalendar;
