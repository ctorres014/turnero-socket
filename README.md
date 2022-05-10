# Notas:

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

Recuerden que deben de reconstruir los módulos de node con el comando

```
npm install
```

# Desplegar site en IIS

### Requerimientos

_Tener instaladas las siguientes características del SO_
* En roles

* En características

_Luego de realizar todas las instalaciones es necesario reiniciar el servidor_

_En la carpeta inetpub/wwwroot agregar los archivos del sitio que se desean publicar en el IIS._
_Abrir el IIS y crear un nuevo site, agregando el nombre del sitio. En la ruta buscar la carpeta correspondiente a los archivos del sitio que anteriormente se agrego en el wwwroot._

_Una vez creado el site en el IIS, en el menu de la derecha hacer click en browser._
