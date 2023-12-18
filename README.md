# Getting Started with Create React App
https://prueb-tecnica-alexander-guiza.netlify.app

Proyecto construido con:
React
typescript
sass
firebase (escogí esta herramienta dado que cuenta con mas aceptación dentro de la comunidad )
arquitectura spa
Netlify (Se hizo el despliegue en esta herramienta por que ya la habia utilizado en otras app y me ha parecido facil de manejar y en su version libre la mas rápida.)


## Instrucciones para instalación en un ambiente local
1. Clonar proyecto
2. Instalar Dependencias
```npm install```

5. Inicializar: 
```npm start```


## Instrucciones para uso de la aplicación

1. El login tiene tres opciones para el ingreso 
  Google 
  Facebook
  por email (recuerda que la contraseña debe tener mas de 6 dígitos)

2. Al ingresar es visible la galeria de imagenes pero puedes darle scroll hacia abajopara ver  las imagenes ya guardadas.
3. En la parte supoerior central hay un botón con el texto de tomar foto, ese botón redirige la app hacia una pantalla, donde puedes prender la camara y tomar la foto.
4. Para regresar a la galeria es necesario presionar el botón galeria aunque, si quieres tomar varias fotos puedes hacerlo en esa misma pantalla, activando de nuevo las camara.

## URL de aplicación

La siguinte es la url donde esta disponible el proyecto, No es necesario tener una sesion por lo que poniendo una contraseña de mas de 6 digitos es posible ingresas tambien esta la opcion de ingresar con google o facebook.

https://prueb-tecnica-alexander-guiza.netlify.app

## Estructura


```plaintext
/
|-- src/
|   |-- components/
|   |   |-- CameraCapture/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |   |-- GaleryImages/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |   |-- Loading/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |   |-- LoginForm/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |   |-- index.tsx
|   |
|   |-- interfaces/
|   |   |-- galery.interfaces.ts
|   |   |-- images.interfaces.ts
|   |   |-- user.interfaces.ts
|   |   |-- index.ts
|   |
|   |-- layouts/
|   |   |-- layout01/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |
|   |-- pages/
|   |   |-- Capture/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |   |-- Galery/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |
|   |   |-- Login/
|   |       |-- index.tsx
|   |       |-- styles.scss
|   |   |-- index.ts
|   |
|   |-- redux/
|   |   |-- slices/
|   |       |-- imagesSlices.ts
|   |       |-- loadingSlices.ts
|   |       |-- userSlices.ts
|   |   |-- store
|   |
|   |-- services/
|   |   |-- firebase.js
|   |   |-- index.ts
|   |
|   |-- App.js
|   |-- index.js
|
|-- public/
|   |-- index.html
|

## Instalación del Proyecto