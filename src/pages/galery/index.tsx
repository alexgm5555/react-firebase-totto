import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { CameraCapture } from '../../componets';


export const GaleryPage:FC = () => {

  return (
    <div className='LoginPage-container'>
      <Layout01 login={true} logout={true}>
        <CameraCapture />
      </Layout01>
    </div>
  );
};
