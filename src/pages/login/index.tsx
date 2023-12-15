import { FC }from 'react';

import './styles.scss';

import { Layout01 } from '../../layouts/layout_1';
import { LoginForm } from '../../componets';


export const LoginPage:FC = () => {

  return (
    <div className='LoginPage-container'>
      <Layout01 login={true} logout={true}>
        <LoginForm />
      </Layout01>
    </div>
  );
};
