import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { CameraCapture, GaleryImages } from '../../componets';


export const GaleryPage:FC = () => {

  return (
    <div className='GaleryPage-container'>
      <Layout01 login={true} logout={true}>
        <GaleryImages />
        <CameraCapture />
      </Layout01>
    </div>
  );
};
