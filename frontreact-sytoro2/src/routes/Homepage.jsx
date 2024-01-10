/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import axios from "axios";
import useStoreContext from "../context/StoreProvider";
import ModalCalendar from "../components/ModalCalendar";
import { toast } from "react-toastify";
import getError from "../utils/getError";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { utcToZonedTime } from "date-fns-tz";
const locales = {
	"en-US": enUS,
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const Homepage = () => {
	const [events, setEvents] = useState([]);
	const [selecteddate, setSeletedDate] = useState("");

	const { state, visitasArrCtx, modalShowCtx, setModalShowCtx } = useStoreContext();

  //aqui leo los eventos de la base de datos
	useEffect(() => {
		
		const obteneEventos = async () => {
			try {
				const url = `${import.meta.env.VITE_BASE_URL}/api/notas/leer-notas`;
				const config = {
					headers: { Authorization: `Bearer ${state.userInfo.token}` },
				};
				const { data } = await axios.get(url, config);

				setEvents([...data]);			
			} catch (error) {
				console.log(error)
			}
		};

		obteneEventos();
	}, [events.length,  state.userInfo.token, visitasArrCtx]);

	const formatEvent = (event) => ({
		...event,
		start: utcToZonedTime(event.start, "Europe/Berlin"), // ajusta la zona horaria según tu necesidad
		end: utcToZonedTime(event.end, "Europe/Berlin"),
	});

	//este es para cheacker si hay notas el mismo dia, asi solo permite un dia
	const checking = async (slot) => {
		try {
			let fecha = new Date(slot.start);
			const url = `${import.meta.env.VITE_BASE_URL}/api/notas/checking-notas`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};

			const { data } = await axios.post(url, { fecha }, config);

			return true;
		} catch (error) {
			toast.warn(getError(error));
			return false;
		}
	};


	const handleSelectSlot = async (slotInfo) => {
		const res = await checking(slotInfo);
		// 
    // 
		if (!res) {
			return;
		}

		setModalShowCtx(true);
		setSeletedDate(slotInfo);
	};
 
	const handleSelectEvent = (event) => {
		// 
    // 
		setSeletedDate(event);
		setModalShowCtx(true);
	};

	const onHIde = () => {
		setModalShowCtx(false);
    // 
	};

	return (
		<div className="">
			<Calendar
				localizer={localizer}
				events={events.map(formatEvent)}
				startAccessor="start"
				views={["month"]}
				endAccessor="start"
				style={{ height: 500 }}
				selectable={true}
				onSelectSlot={handleSelectSlot}
				onSelectEvent={handleSelectEvent}
			/>

			<ModalCalendar
				show={modalShowCtx}
				selecteddate={selecteddate}
				setselecteddate={setSeletedDate}
				setEvents={setEvents}
				events={events}
				onHide={onHIde}
			/>
		</div>
	);
};

export default Homepage;
