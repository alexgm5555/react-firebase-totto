import { useDispatch, useSelector } from 'react-redux';
import { FC, useRef, useState, useInsertionEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';
import {v4 as uuid} from 'uuid';

import './styles.scss';

import { db } from '../../services';
import { ImagesInterface } from '../../interfaces';
import { setUpdate } from '../../redux/imagesSlice';
import { setLoading } from '../../redux/loadingSlice';

export const CameraCapture:FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [dispositivos, setDispositivos] = useState<MediaDeviceInfo[]>([]);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<string | null>(null);


  const dataUser = useSelector((state: any) => state.user);
  const dispatch =  useDispatch();

  const cargarDispositivos = async () => {
    try {
      // Enumera los dispositivos de entrada de medios
      const dispositivos = await navigator.mediaDevices.enumerateDevices();
      const camaras = dispositivos.filter((dispositivo) => dispositivo.kind === 'videoinput');
      setDispositivos(camaras);
      setDispositivoSeleccionado(camaras[0]?.deviceId || null);
      
      if (camaras.length > 0) {
        // Carga la primera cámara disponible automáticamente
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: camaras[0].deviceId },
        });
        setStream(stream);
        setShowCamera(true);

        // Establece el flujo de la cámara como fuente para el elemento video
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        console.warn('No se encontraron cámaras disponibles.');
      }
    } catch (error) {
      console.error('Error al enumerar dispositivos:', error);
    }
  };

  const startCamera = async () => {
    console.log('startCamera');
    
    try {
      if (!dispositivoSeleccionado) {
        console.error('No se ha seleccionado ningún dispositivo de cámara.');
        return;
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: dispositivoSeleccionado,
        },
      });

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
    console.log('cerrado');
    console.log(stream);

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
      
      setShowCamera(false);
    }
  };

  const capture = async () => {
    dispatch(setLoading(true));
    stopCamera();
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpg');
        await createImgInBD(imageSrc);
      }
    }
  };

  const createImgInBD =async ( imageSrc: any ) => {
    try {

      const storage = getStorage();
      const name = new Date().toLocaleDateString("es-MX", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "America/Bogota"
      }).replaceAll(' ','-').replaceAll(',','-').replaceAll(':','')
      const storageRef = ref(storage, `images/${name}.jpg`);
      const imageString = imageSrc.split(',')[1];
      await uploadString(storageRef, imageString, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      const dataToSend: ImagesInterface = {
        user_uuid: dataUser.uuid,
        name: `images/${name}.jpg`,
        imageUrl,
        uuid: uuid()
      }
      const docRef = await addDoc( collection(db, "images"), dataToSend );
      setImageSrc(imageUrl);
      dispatch(setUpdate());
      console.log('Imagen subida y URL guardada en Firestores:', imageUrl, docRef.id);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
       console.error('Error al subir la imagen:', error);
    }
  };

  
  useInsertionEffect(() => {
    cargarDispositivos();
    return ()=>stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='CameraCapture-container'>
      <label htmlFor="seleccionarCamara">Seleccionar Cámara: </label>
      <Form.Select
        id="seleccionarCamara"
        onChange={(e) => setDispositivoSeleccionado(e.target.value)}
        value={dispositivoSeleccionado || ''}
      >
        {dispositivos.map((dispositivo) => (
          <option key={dispositivo.deviceId} value={dispositivo.deviceId}>
            {dispositivo.label || `Cámara ${dispositivo.deviceId}`}
          </option>
        ))}
      </Form.Select>
      <video className={`camera-${showCamera}`} ref={videoRef} autoPlay muted playsInline />
      {imageSrc && !showCamera && 
        <div className='img-div'>
          <br />
          <img src={imageSrc} alt="Capturada" />
        </div>}
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
