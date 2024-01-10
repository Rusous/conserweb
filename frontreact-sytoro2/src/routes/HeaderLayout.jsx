import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { toast } from "react-toastify";
import useStoreContext from "../context/StoreProvider";

const HeaderLayout = () => {
	const { state, dispatch } = useStoreContext();
	const { userInfo } = state;

	const handleLogout = () => {
		localStorage.clear();
		dispatch({ type: "log out" });
		toast.success(`Good Bye, ${userInfo.name}`);
	};

	return (
		<div className="mb-5">
			<Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
				<Container fluid="xxl">
					<Navbar.Brand as={Link} className="fs-3" to="/">
						<span>S</span>
						<span className="text-danger">ytoro</span>
						<small>2</small>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav
							className="me-auto my-2 my-lg-0"
							style={{ maxHeight: "100px" }}
							navbarScroll
						>
							{/* <Nav.Link as={Link} to="#">
								Sobre Nosotros
							</Nav.Link>
							<Nav.Link as={Link} to="#">
								Contactanos
							</Nav.Link> */}

							{userInfo.name && (
								<>
									{/* <p>bienvenido {userInfo.name}</p> */}
									<Nav.Link className='text-danger' as={Link} to="#">Bienvenido, {userInfo.name}</Nav.Link>
								</>
							)}

						</Nav>

						<Nav className="me-3">
							{userInfo.role === "admin" && (
								<DropdownButton id="dropdown-basic-button" title="Admin">
									<Dropdown.Item as={Link} to="/admin/agregar-conserje">
										Agregar Conserjes
									</Dropdown.Item>
									<Dropdown.Item as={Link} to="/admin/agregar-arrendatario">
										Agregar Usuarios
									</Dropdown.Item>
								</DropdownButton>
							)}
						</Nav>

						<Nav className="me-4">
							{userInfo.name && (
								<>
								<Nav.Link as={Link} to="/">
										Calendario
									</Nav.Link>
									<Nav.Link as={Link} to="/usuarios">
										Usuarios
									</Nav.Link>
									<Nav.Link as={Link} to="/historial">
										Historial
									</Nav.Link>
									<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
								</>
							)}

	
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default HeaderLayout;
