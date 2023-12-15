import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { CameraCapture } from '../../componets';
import { Button } from 'react-bootstrap';


export const CapturePage:FC = () => {

  const buttonGalery = <Button variant="outline-success" href="/galery">Regresar Galeria</Button>

  return (
    <div className='GaleryPage-container'>
      <Layout01 login={true} logout={true} centralChildren={buttonGalery}>
        <CameraCapture />
      </Layout01>
    </div>
  );
};
