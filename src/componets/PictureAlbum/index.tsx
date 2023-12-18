// PictureAlbum.tsx
import React from 'react';
import { ImagesInterface } from '../../interfaces';

interface PictureAlbumProps {
  pictures: ImagesInterface[];
}

// Componente funcional que recibe propiedades de tipo PictureAlbumProps
export const PictureAlbum: React.FC<PictureAlbumProps> = ({ pictures }) => {
  return (
    <div>
      <h2>Álbum de pictures</h2>
      <div className="album">
        {pictures.map((foto) => (
          <div key={foto.uuid} className="foto">
            <img src={foto.imageUrl} alt={foto.name} />
            <p>{foto.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
