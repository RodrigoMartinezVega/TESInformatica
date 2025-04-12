# Login Inseguro con Inyección NoSQL

Creacion de un login con el cual se pueda hacer inyeccion sql

## Tecnologías

- Node.js  
- Express  
- MongoDB Atlas  
- Mongoose

## Crear un usuario

 
[http://localhost:3000/crear](http://localhost:3000/crear)  
Se creará el usuario:  
- **usuario**: `admin`  
- **contraseña**: `admin123`

## Intento de login normal

1. Ingresa desde la página principal `/`.
2. Usa las credenciales reales: `admin` / `admin123`.

## Realizar bypass por inyección NoSQL

Haz clic en el botón **Bypass Login** para enviar un payload

```json
{
  "username": "admin",
  "password": { "$ne": null }
}
```

Esto permite acceder sin conocer la contraseña real