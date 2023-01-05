import { Container, Nav, Navbar } from 'react-bootstrap'
import { FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import logo from './assets/logo.png'

export const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/agenda">
            Agendamento
          </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <FiUser size={30} />
            <h6>Vitor Farias</h6>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
