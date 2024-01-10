/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import useStoreContext from "../context/StoreProvider";
import axios from "axios";

const SelectApt = ({
	setShowSelectApt,
	contenidoTextarea,
	setContenidoTextarea,
	setGetid,
	getId

}) => {
	const { state } = useStoreContext();
	const [selectOptions, setSelectOptions] = useState([]);

	useEffect(() => {
		

		const getUsers = async () => {
			try {
				const url = `${
					import.meta.env.VITE_BASE_URL
				}/api/arrendatario/arrendatarios-by-apt`;
				const config = {
					headers: { Authorization: `Bearer ${state.userInfo.token}` },
				};

				const { data } = await axios.get(url, config);

				setSelectOptions(data);
			} catch (error) {
				console.log(error)
			}
		};

		getUsers();
	}, []);

	//eso es cuando se selecciona un usuario despues de haber escrito user
	const handleSelectChangeUser = (e) => {

		const id = e.target.value.split('/')[1]
		if(!getId.includes(id)){
			// 
			setGetid([...getId, id])
		}


		const aptTexto = e.target.value.split('/')[0]
		setShowSelectApt(false);
		// setSelectedOption(nuevoTexto);

		// Actualizar el estado con el nuevo texto del usuario
		const nuevoContenidoConReemplazo = contenidoTextarea.replace(
			/dpto./gi,
			(match) =>
				match === "dpto."
					? `<span style="background-color: yellow;">${aptTexto}</span> `
					: match
		);
		setContenidoTextarea(nuevoContenidoConReemplazo);
	};

	return (
		<select
			className="form-select text-center text-bg-success"
			// value={selectedOption}
			onChange={handleSelectChangeUser}
		>
			<option value="">Selecciona un departamento</option>
			{selectOptions.map((item) => (
				<option key={item._id} value={`${item.apartamento}/${item._id}`}>
					{item.apartamento}
				</option>
			))}
		</select>
	);
};

export default SelectApt;
