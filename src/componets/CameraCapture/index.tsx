import React, { FC, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

import './styles.scss';


import './styles.scss';
import { db } from '../../services/firebase/config';
import { useSelector } from 'react-redux';

export const CameraCapture:FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const dataUser = useSelector((state: any) => state.user);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(newStream);
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      setShowCamera(false);
      // setImageSrc(null);
    }
  };

  const capture = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/png');
        setImageSrc(imageSrc);
        await createImgInBD(imageSrc);
        
      }
    }
  };

  const createImgInBD =async ( imageSrc: any ) => {
    try {

      const storage = getStorage();
      const storageRef = ref(storage, `images/${Date.now()}.png`);
      const imageString = imageSrc.split(',')[1];
      await uploadString(storageRef, imageString, 'base64');

      const imageUrl = await getDownloadURL(storageRef);

      const docRef = await addDoc( collection(db, "images"),{
        uuid: dataUser.uuid,
        name: `images/${Date.now()}.png`,
        imageUrl
      });
      console.log('Imagen subida y URL guardada en Firestore:', imageUrl, docRef.id);
    } catch (error) {
       console.error('Error al subir la imagen:', error);
    }
  };

  return (
    <div className='CameraCapture-container'>
      <video ref={videoRef} autoPlay muted playsInline />
      {imageSrc && !showCamera && <img src={imageSrc} alt="Capturada" />}
      <div className='button-div'>
        {!showCamera ? 
          <Button variant="outline-success" onClick={startCamera}>Iniciar Cámara</Button> :
          <>
            <Button variant="outline-success" onClick={stopCamera}>Detener Cámara</Button>
            <Button variant="outline-success" onClick={capture}>Tomar Foto</Button>
          </>
        }
      </div>
    </div>
  );
};

