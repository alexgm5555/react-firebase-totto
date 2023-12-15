import { FC, useEffect, useState }from 'react';

import './styles.scss';

import { getImages } from '../../services';
import { ImagesInterface } from '../../interfaces';
import { useSelector } from 'react-redux';


export const GaleryImages:FC = () => {
  const [images, setImages] = useState<[ImagesInterface] | any>();
  const dataImages = useSelector((state: any) => state.images);
  
  const _getImages = async()=>{
    const images = await getImages();
    setImages(images);
  }

  useEffect(() => {
    _getImages();
    console.log(dataImages);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataImages.update]);

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
