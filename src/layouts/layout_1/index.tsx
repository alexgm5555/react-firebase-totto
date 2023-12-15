import { FC, ReactNode, useEffect, useState }from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { signOut } from 'firebase/auth';

import { auth } from '../../services/firebase/config';

import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/userSlice';

interface props {
  children: ReactNode
  login: boolean,
  logout: boolean,
  pageRef?: string
}

export const Layout01:FC<props> = ({
  children,
  login,
  logout,
  pageRef
}) => {
  const [showName, setShowName] = useState(false);
  const data = useSelector((state: any) => state.user);
  const dispatch =  useDispatch();

  useEffect(() => {
    setShowName(data.name !== '');
  }, [data]);


  const handleLogout = async () => {
    try {
      // Cierra sesión
      await signOut(auth);
      dispatch(addUser({
        email: '',
        img: '',
        name: ''
      }));
      console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='Layout01-container'>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Galeria Totto</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
          </Nav>
          <Form className="d-flex">
            { showName  && <>
              <>
                <Navbar.Brand href="#">Bienvenido, {data.name}!</Navbar.Brand>
                <Button variant="outline-success" onClick={handleLogout} href="/">Cerrar Sesión</Button>
              </>
            </>}
            { !showName  && <>
              <Button variant="outline-success"href="/">Registrar</Button>
            </>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='children-container'>
      {children}
    </div>
  </div>
  );
};
