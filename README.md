## Información sobre el Desafio 13

Se agrego la posibilidad de subir foto de perfil y documentos, para ello se modifico el modelo de Users, se agregaron 4 rutas nuevas las cuales permiten administrar dicho contenido:

- **POST**        http://localhost:8080/api/users/:uid/profile

Esta ruta permite subir la foto de perfil del usuario.

- **POST**        http://localhost:8080/api/users/:uid/documents

Esta ruta permite subir documentos al usuario que inicio sesion, los mismos deben ser en formato PDF.

- **POST**        http://localhost:8080/api/users/premium/:uid

Esta ruta permite convertir un usuario a PREMIUM, siempre y cuando el mismo tenga cargado los documentos correspondientes, para que funcione los documentos que se suban deben tener los mismos nombres que se menciona en la consigna del desafio para que se puedan identificar: "Identificacion.pdf", "Comprobante de domicilio.pdf" y "Comprobante de estado de cuenta.pdf", yo decidi que los mismos sean pdf.

- **DELETE**      http://localhost:8080/api/users/:uid/documents/:filename

Esta ruta permite eliminar algun documento en caso de que haya algun error en una carga.

Para la administracion ademas agregue una vista desde donde se puede cargar la foto de perfil como tambien los documentos, la misma es:

- **GET**      http://localhost:8080/view/profile

Para que funcione esta ultima ruta es necesario estar logueado. Las pruebas tambien pueden hacerse con algun cliente REST, pero a los fines de facilitar las pruebas realice la vista **view/profile**.

Ademas se agrego la funcionalidad para que se actualice el campo **last_connection** al modelo Users para almacenar la hora que se conecta el usuario.

## Temas de clases pasadas

Se agrego la posibilidad de realizar testing unitario, para ello se agregaron las librerias "chai", "mocha" y "supertest".
Se agrego el archivo **test/supertest.test.js** en el raiz del producto. Ademas se agrego en el package.json el comando "test" el cual permite correr el test: **npm run test**

Se agrego la documentacion de las rutas de Productos y Carrito para ello se utilizaron las librerias **swagger-jsdoc** y **swagger-ui-express**, para acceder a la documentacion se debe utilizar la ruta: **http://localhost:8080/api-docs**.

Se agrego la posibilidad de recuperar y cambiar la contraseña, para ello se creo la ruta **http://localhost:8080/view/olvido** alli se debe proporcionar un email valido que este asociado a alguna de las cuentas de usuario creada y le llegara un email con un link 
**http://localhost:8080/view/recuperar/:token** que abrira un formulario que permite escribir una nueva contraseña, la misma no debe ser igual a la anterior, ademas este link caducara pasada la hora.

Ademas se agregaron al esquema de User el rol "PREMIUM" y a productos el campo "owner" con el email del usuario.

Se agrego la libreria **Logger Winston** para trabajar con los logs del backend, para ello cree un archivo "loggers.js" en la carpeta "utils" donde se crea y configuran los distintos niveles de error, ademas deje la posibilidad de generar logs en consola, para ello hay que configurar la variable de entorno MODE con el valor "development", en caso contrario se almacenaran todos en archivos, estos ultimos se generaran en la carpeta logs, uno para logs generales llamado "general.log" y otro para errores llamado "errors.log".

Ademas cree una ruta **http://localhost:8080/loggerTest** que permite probar cada uno de los niveles de error.

Se agrego la ruta **http://localhost:8080/mockingproducts** la misma genera y devuelve una lista de 100 productos con los mismos 
campos del modelo Product.

Ademas se agrego el manejador de errores **http-errors** como alternativa al visto en clase, el mismo lo aplique en la ruta para crear productos **http://localhost:8080/api/products**, mas abajo se explica como se utiliza y que datos hay que pasar al body.

Se separo en capas el proyecto, al mismo se le agrego la carpeta service, en el mismo se realizaron las clases que 
se encargan de interactuar con las clases DAO de User, Product, etc.

Ademas esta el archivo .env en el raiz con todas las variables de entorno tanto para la configuracion de MONGO y demas 
funcionalidades, para acceder a las variables de entorno se creo un archivo de configuracion config/config.js donde se 
exportan las mismas.

Se aplico el patron Factory para poder trabajar tanto con MONGO como con FS, este ultimo no quedo implementado, lo realice 
a los fines de que quede se pueda realizar a futuro dicha implementacion.

Se incorporo la posibilidad de finalizar la compra y la generacion del ticket, para ello se creo el modelo Ticket.

Para agregar productos al carrito se deben loguear como usuarios, en caso contrario no le permitira agregar los productos al carrito, cuando se haga click en el boton "Agregar al carrito" va a solicitar el ingreso del id del carrito, para crear 
los mismos esta la ruta **http://localhost:8080/api/cart** la misma devueve el id.

Para visualizar el carrito se debe visitar la siguiente ruta **http://localhost:8080/view/cart/cid** donde cid es el id 
del carrito que se creo previamente, alli esta el boton para finalizar la compra y al finalizar generara el ticket con 
el total, ademas que eliminara los productos ya vendidos y dejara intactos aquellos que no cuenten con stock suficiente.


- **GET**      http://localhost:8080/view/profile

En cuanto al login con GitHub entiendo que la entrega anterior no les funciono al momento de probarlo, por mi lado les cuento que a mi 
me funciona perfectamente, de todas formas si te vuelve a pasar avisame que sigo investigando, si te arroja un error pasamelo en la 
devolucion.

## Resumen de todo lo que se fue agregando

Se incluyo funcionalidad de login y registro de usuarios, los mismos son necesarios para acceder a las secciones de Productos, 
Perfil y Carrito. Para ello se utilizo el paquete "express-session", ademas se agrego el modelo User para persistir la informacion de cada usuario que se registre.

Se agrego la posibilidad de login y registro utilizando passport, utilizando los paquetes "passport", "passport-local" y 
"passport-github2", este ultimo para que se pueda utilizar la autenticacion con GitHub.

En el archivo .env se agregaron las variables de entorno para la configuracion GitHub:

```
GITHUB_KEY=5bf3f144ace191045c9a1fce79b489570a5d71dd
GITHUB_APP_ID=406931
GITHUB_CLIENT_ID=Iv1.c8c7fadb4767d889
GITHUB_CALLBACK=http://localhost:8080/api/auth/callbackGitHub
```

A continuacion se listan las rutas que se fueron agregando.

- **GET**      http://localhost:8080/view/login
- **GET**      http://localhost:8080/view/register
- **GET**      http://localhost:8080/view/logout
- **POST**     http://localhost:8080/api/auth/register
- **POST**     http://localhost:8080/api/auth/login

A continuación, se detallan los endpoints de la API:

- **POST**     http://localhost:8080/api/cart
- **GET**      http://localhost:8080/api/cart/:cid
- **POST**     http://localhost:8080/api/cart/:cid/:pid
- **DELETE**   http://localhost:8080/api/cart/:cid/:pid
- **DELETE**   http://localhost:8080/api/cart/:cid
- **PUT**      http://localhost:8080/api/cart/:cid/:pid

```json
{
	"quantity": 4
}
```

- **PUT**      http://localhost:8080/api/cart/:cid   

```json 
[
	{ "_id": "6513307d03d6bf40717b4a31", "quantity": 7 },
	{ "_id": "6513305003d6bf40717b4a2d", "quantity": 6 },
	{ "_id": "6513306803d6bf40717b4a2f", "quantity": 5 }
]
```

### Endpoint para administrar los productos:

- **POST**     http://localhost:8080/api/products
- **GET**      http://localhost:8080/api/products
- **GET**      http://localhost:8080/api/products/:id
- **PUT**      http://localhost:8080/api/products/:id
- **DELETE**   http://localhost:8080/api/products/:id

Para los casos de POST y PUT, se necesita pasar los datos en formato JSON en el body de la solicitud. A continuación, se muestra una estructura de ejemplo:

```json
{
  "title": "Test",
  "description": "Test",
  "price": 100,
  "code": "ABC001",
  "stock": 1,
  "status": true,
  "thumbnail": "url imagen"
}
```

### URL de las diferentes vistas

- **GET**      http://localhost:8080/view/products
- **GET**      http://localhost:8080/view/products/:pid
- **GET**      http://localhost:8080/view/cart/:cid
- **GET**      http://localhost:8080/view/realtimeproducts
- **GET**      http://localhost:8080/view/chat

### Algunas aclaraciones

En la vista de products deje la posibilidad de agregar al carrito los productos, al darle agregar al carrito va a solicitar 
el CID correspondiente al carrito, luego con la url cart/:cid se pueden ver los productos agregados, ademas deje la posibilidad 
de paginar.