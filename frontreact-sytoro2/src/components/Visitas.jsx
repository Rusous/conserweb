/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useStoreContext from "../context/StoreProvider";
import axios from "axios";
import ModalformEditarVisitas from "./ModalformEditarVisitas";

const Visitas = ({ selecteddate, setIsNotasview, isNotasView }) => {
	// const [visitasArr, setVisitasArr] = useState([]);
	const { state, setVisitasArrCtx, visitasArrCtx, setModalShowCtx } =
		useStoreContext();
	const [show, setShow] = useState(false);
	const [visitaToUpdate, setVisitaToUpdate] = useState({});

	const [columns, setColumns] = useState([
		{ key: "col1", name: "Nombre", width: 200 },
		{ key: "col2", name: "Rut", width: 100 },
		{ key: "col3", name: "Depto.", width: 50 },
		{ key: "col4", name: "Est.", width: 50 },
		{ key: "col5", name: "Patente", width: 100 },
		{ key: "col6", name: "Hora entrada", width: 20 },
		{ key: "col7", name: "Hora salida", width: 20 },
		{ key: "col8", name: "Conserje", width: 200 },
		{ key: "col9", name: "Acciones", width: 100 },
		// Agrega más columnas según sea necesario
	]);

	useEffect(() => {
		

		setVisitasArrCtx(selecteddate.visitas);
	}, [selecteddate.visitas]);

	const onResize = useCallback(
		(index) =>
			(e, { size }) => {
				setColumns((prevColumns) => {
					const nextColumns = [...prevColumns];
					nextColumns[index] = {
						...nextColumns[index],
						width: size.width,
					};
					return nextColumns;
				});
			},
		[]
	);

	//abre el formulario para editar visitas
	const handleEditar = async (item) => {
		setShow(!show);
		setVisitaToUpdate(item);
	};

	const handleEliminar = async (idV) => {
		
		try {
			const url = `${import.meta.env.VITE_BASE_URL}/api/notas/eliminar-visita/${
				selecteddate._id
			}/${idV}`;
			const config = {
				headers: { Authorization: `Bearer ${state.userInfo.token}` },
			};

			const { data } = await axios.delete(url, config);

			// 
			setVisitasArrCtx(data.visitas);
		} catch (error) {
			console.log(error)
		} finally {
			setModalShowCtx(false);
			setIsNotasview(!isNotasView)
		}
	};

	return (
		<div className="table-responsive-xxl">
			{show && (
				<ModalformEditarVisitas
					show={show}
					setShow={setShow}
					visitaToUpdate={visitaToUpdate}
					selecteddate={selecteddate}
					setVisitasArrCtx={setVisitasArrCtx}
					setIsNotasview={setIsNotasview}
					isNotasView={isNotasView}
				/>
			)}

			<h4>Ingresa tus visitas</h4>
			<table className="table">
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={column.key} style={{ width: column.width }}>
								<Resizable
									width={column.width}
									height={0}
									onResize={onResize(index)}
								>
									<div>{column.name}</div>
								</Resizable>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{visitasArrCtx?.map((item) => (
						<tr key={item.idV}>
							<td>{item.nombreV}</td>
							<td>{item.rutV}</td>
							<td>{item.deptoV}</td>
							<td>{item.estV ? item.estV : 'no'}</td>
							<td>{item.patenteV}</td>
							<td>{item.horaInV}</td>
							<td>{item.horaOutV}</td>
							<td>{item.conserjeV}</td>
							<td>
								<div>
									<button
										onClick={() => handleEditar(item)}
										className="btn btn-warning me-1  d-inline"
									>
										Edit.
									</button>

									<button
										onClick={() => handleEliminar(item.idV)}
										className="btn btn-danger"
									>
										Elim.
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Visitas;
