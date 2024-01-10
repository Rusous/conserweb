/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useStoreContext from "../context/StoreProvider";

import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

function ModalCrearVisitas({
	showModalVisitas,
	setShowModalVisitas,
	handleGuardarEditar,
}) {

	const [nombreV, setNombreV] = useState("");
	const [rutV, setRutV] = useState("");
	const [deptoV, setDeptoV] = useState("");
	const [estV, setEstV] = useState("");
	const [patenteV, setPatenteV] = useState("");
	const [horaInV, setHoraInV] = useState("");
	const [horaOutV, setHoraOutV] = useState("");
	const [conserjeV, setConserjeV] = useState("");

  const {setVisitasArrCtx, visitasArrCtx} = useStoreContext()

	const handleClose = () => setShowModalVisitas(false);

	const handleSubmit = () => {

    if([nombreV, rutV].includes('')){
      toast.warning('Nombre y Rut son Obligatorios')
      return
    }

    const formData ={
      idV:uuidv4(),
      nombreV,
      rutV,
      deptoV,
      estV,
      patenteV,
      horaInV,
      horaOutV,
      conserjeV
    }
		handleGuardarEditar(formData);
    

    if(visitasArrCtx == undefined){
      setVisitasArrCtx([formData])
    }else{
      setVisitasArrCtx([...visitasArrCtx, formData])
    }
    setShowModalVisitas(false)

	};


	return (
		<>
			<Modal
				className="bg-dark bg-opacity-75"
				show={showModalVisitas}
				onHide={handleClose}
				animation={true}
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Modal.Title>Modal Crear Visitas</Modal.Title>
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
					<Button variant="primary" onClick={handleSubmit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalCrearVisitas;
