import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useNavigateEvent = (callback: (newPath: string) => void) => {
  const location = useLocation();

  useEffect(() => {
    const handleNavigate = () => {
      // Llama al callback cuando se navega a otra pantalla
      if (callback) {
        callback(location.pathname);
      }
    };

    // Agrega el listener al cambio de ruta
    window.addEventListener('popstate', handleNavigate);

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('popstate', handleNavigate);
    };
  }, [callback, location.pathname]);
};

export default useNavigateEvent;
