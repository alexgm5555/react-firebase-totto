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
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../componets';

interface props {
  children: ReactNode
  centralChildren?: ReactNode
  veryfyLogin?: boolean,
  buttonRegister?: boolean
}

export const Layout01:FC<props> = ({
  children,
  centralChildren,
  veryfyLogin,
  buttonRegister
}) => {
  const [showName, setShowName] = useState(false);
  const dataUser = useSelector((state: any) => state.user);
  const { startLoading } = useSelector((state: any) => state.loading);
  
  let navigate = useNavigate();
  const dispatch =  useDispatch();

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

  const verifyUserLoggin = () =>{
    if (dataUser.name === '' && veryfyLogin) navigate('/');
    setShowName(dataUser.name !== '');
  }

  useEffect(() => {
    verifyUserLoggin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);

  return (
    <div className='Layout01-container'>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Galeria Totto</Navbar.Brand>
        <Nav 
          className='justify-content-center'
          style={{ 
            left: "calc(50% - 70px)",
            position: "absolute" 
          }}  
        >
          {centralChildren}
        </Nav>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
          </Nav>
          <Form className="d-flex form">
            { showName  && <>
              <>
                <Navbar.Brand className="name" href="#">Bienvenido, {dataUser.name}!</Navbar.Brand>
                <Button variant="outline-success" onClick={handleLogout} href="/">Cerrar Sesión</Button>
              </>
            </>}
            { buttonRegister !== false && !showName  && <>
              <Button variant="outline-success"href="/">Registrar</Button>
            </>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='children-container'>
      {/* <Loading /> */}
      {startLoading === true && <Loading />}
      {children}
      {/* {children}  */}
    </div>
  </div>
  );
};
