import { FC, useEffect, useState }from 'react';

import './styles.scss';

import { getImages } from '../../services';
import { ImagesInterface } from '../../interfaces';


export const GaleryImages:FC = () => {
  const [images, setImages] = useState<[ImagesInterface] | any>();
  
  const _getImages = async()=>{
    const images = await getImages();
    setImages(images);
  }

  useEffect(() => {
    _getImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='GaleryImages-container'>
      {images && images.map((image: any)=>(
        <div key={image?.uuid} className='marco'>
          <img  key={image?.uuid} className='img-image' src={`${image.imageUrl}`} alt="" />
        </div>
      ))}
    </div>
  );
};
