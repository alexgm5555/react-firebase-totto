import { FC, useEffect, useState }from 'react';
import { useDispatch } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

import './styles.scss';

import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  registrarUsuario
} from '../../services'
import { addUser } from '../../redux/userSlice';
import { UserInterface } from '../../interfaces';


export const LoginForm:FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<UserInterface>();
  const [showFormEmail, setShowFormEmail] = useState<boolean>(false);


  const dispatch =  useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (_user: any) => {
      setUser(_user);
      try {
        dispatch(addUser({
          uuid: _user.uid,
          email: _user.email,
          img: _user.photoURL,
          name: _user.displayName || _user.email
        }));
        navigate('/galery');
      } catch (error) {
        navigate('/');
      }
    });

    // Limpiar el observador al desmontar el componente
    return () => unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (provider: any) => {
    try {
      // Inicia sesión con el proveedor seleccionado
      const result = await signInWithPopup(auth, provider);
      console.log('Inicio de sesión exitoso:', result.user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registrarUsuario(email, password);
  };

  return (
    <div className='LoginForm-container'>
      {!user && (
        <form onSubmit={handleFormSubmit}>
          <>
          <h2>Iniciar Sesión</h2>
          {showFormEmail ? 
            <>
              <label htmlFor="email">Correo Electrónico:</label>
              <FormControl
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Contraseña:</label>
              <FormControl
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="buttons_form" type="submit">Registrarse</button>
              <button className="buttons_form" onClick={() => setShowFormEmail(false)}>Redes Sociales</button>
              <br />
            </> :
            <>
              <br />
              <div className="buttons_form" onClick={() => handleLogin(new GoogleAuthProvider())}>
                <svg width="2em" data-e2e="" height="2em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z" fill="#4285F4"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z" fill="#34A853"></path><path fillRule="evenodd" clipRule="evenodd" d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z" fill="#FBBC04"></path><path fillRule="evenodd" clipRule="evenodd" d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z" fill="#EA4335"></path>
                </svg>
                <div data-testid="displayText">Continuar con Google</div>
              </div>
              <div className="buttons_form" onClick={() => handleLogin(new FacebookAuthProvider())}>
                <svg width="2em" data-e2e="" height="2em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z" fill="white"></path>
                  <path d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z" fill="#0075FA"></path>
                </svg>
                <div data-testid="displayText">Continuar con Facebook</div>
              </div>
              <div className="buttons_form" onClick={() => setShowFormEmail(true)}>
                <svg width="2em" data-e2e="" height="2em" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path>
                </svg>
                <div data-testid="displayText">Continuar con email</div>
              </div>
            </>
          }  
          </>
        </form>
      )}
    </div>
  );
};
