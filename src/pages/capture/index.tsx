import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { CameraCapture } from '../../componets';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export const CapturePage:FC = () => {
  let navigate = useNavigate();

  const buttonGalery = <Button variant="outline-success" onClick={()=>navigate('/galery')}>Regresar Galeria</Button>

  return (
    <div className='GaleryPage-container'>
      <Layout01 login={true} logout={true} centralChildren={buttonGalery}>
        <CameraCapture />
      </Layout01>
    </div>
  );
};
