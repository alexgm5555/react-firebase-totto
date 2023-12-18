import { FC, useEffect, useState }from 'react';

import './styles.scss';

import { getImages } from '../../services';
import { ImagesInterface } from '../../interfaces';

import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/loadingSlice';
// import { PictureAlbum } from '../PictureAlbum';


export const GaleryImages:FC = () => {
  const [images, setImages] = useState<[ImagesInterface] | any>();
  
  const dataImages = useSelector((state: any) => state.images);
  const dispatch =  useDispatch();
  
  const _getImages = async()=>{
    const images = await getImages();
    setImages(images);
    dispatch(setLoading(false));
  }

  useEffect(() => {
    dispatch(setLoading(true));
    _getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataImages.update]);


  useEffect(() => {
    // dispatch(setLoading(true));
    _getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='GaleryImages-container'>
      {images && images.map((image: any)=>(
        <div key={image?.uuid} className='marco'>
          <img  key={image?.uuid} className='img-image' src={`${image.imageUrl}`} alt="" />
        </div>
      ))}
      {/* {images && <PictureAlbum pictures={images}></PictureAlbum>} */}
    </div>
  );
};
