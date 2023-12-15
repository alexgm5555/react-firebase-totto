import { FC, useEffect, useState }from 'react';
import { useDispatch } from 'react-redux';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';

import './styles.scss';
import {
  auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  registrarUsuario
} from '../../services'
import { addUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';


export const LoginForm:FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);

  const dispatch =  useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (_user: any) => {
      setUser(_user);
      console.log(_user);
      
      dispatch(addUser({
        uuid: _user.uid,
        email: _user.email,
        img: _user.photoURL,
        name: _user.displayName || _user.email
      }));
      navigate('/galery');
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
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <br />
          {/* Botones de inicio de sesión con Google, Facebook y LinkedIn */}
          <button onClick={() => handleLogin(new GoogleAuthProvider())}>
            <img src={'googleLogo'} alt="Google Logo" />
            {/* Iniciar Sesión con Google */}
          </button>
          <button onClick={() => handleLogin(new FacebookAuthProvider())}>
            <img src={'facebookLogo'} alt="Facebook Logo" />
            {/* Iniciar Sesión con Facebook */}
          </button>
          {/* Para LinkedIn, necesitarás implementar la integración según la documentación de Firebase */}
        </>
      </form>
    )}
    </div>
  );
};

