import { ImagesInterface } from '../../interfaces';
import { db } from './config';
import { collection, getDocs } from 'firebase/firestore';

// Función asíncrona para obtener datos de Firestore
export const getImages = async () => {
    try {
    const imagesRef = collection(db, 'images');
    const querySnapshot = await getDocs(imagesRef);
    
    const data = await querySnapshot.docs.map((doc) => ({
      ...doc.data() as ImagesInterface,
    }));
    return data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};
