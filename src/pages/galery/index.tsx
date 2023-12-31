import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { GaleryImages } from '../../componets';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const GaleryPage:FC = () => {
  let navigate = useNavigate();
  
  const buttonCapture = <Button variant="outline-success" onClick={()=>navigate('/capture')}>Iniciar Cámara</Button>

  return (
    <div className='GaleryPage-container'>
      <Layout01 veryfyLogin={true} centralChildren={buttonCapture}>
        <GaleryImages />
      </Layout01>
    </div>
  );
};
