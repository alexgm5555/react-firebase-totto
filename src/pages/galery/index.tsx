import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { GaleryImages } from '../../componets';
import { Button } from 'react-bootstrap';

export const GaleryPage:FC = () => {

  const buttonCapture = <Button variant="outline-success" href="/capture">Iniciar Cámara</Button>

  return (
    <div className='GaleryPage-container'>
      <Layout01 login={true} logout={true} centralChildren={buttonCapture}>
        <GaleryImages />
      </Layout01>
    </div>
  );
};
