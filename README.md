# backend-v2

#### First things first

`npm install`

#### Production

`npm start`

#### Development

`npm run dev`

#### Build

`npm run build`

## Variables de Entorno

## PORT = 3000

## DATABASE_URL = mysql://user:password@hostname:port/name_database

## JWT_SECRET= https://generate-secret.vercel.app/64 <=== ir al Link

---

## ENDPOINT

# CLIENTE

## SignUP CLIENT

`METODO POST` http://localhost:3000/users/signup

{
"email": "e@gmial.com",
"firstName": "Ezequiel",
"birth_date": "2023-02-10T06:26:42.510Z",
"password": "stringA12" // su longitud debe ser mayor a 7, debe contener Mayuscula y Numero
}
no require headers

### lo que responde es un Json mas el Token, y Token se encuentra en los headers

```js
=============================================================================
```

## SignIn CLIENT

`METODO POST` http://localhost:3000/users/signin

```
{
"email": "e@gmial.com",
"password": "stringA12"
}
```

no require headers

### lo que responde es un Json mas el Token, y Token se encuentra en los headers

```js
=============================================================================
```

## Profile CLIENT

`METODO GET` http://localhost:3000/users/profile

requiere en su header con el siguiente formato

Authorization:Bearer token

## lo que responde es un Json de la info del Usuario

```js
=============================================================================
```

# SUPERADMIN

## Set Role SUPERADMIN

`METODO PUT` http://localhost:3000/superAdmin/set_role

requiere en su header y un body

Authorization:Bearer token

```
{
"id": "7462c16d-6400-484e-a4f8-e1af778f2e78",
"role":"ADMIN"
}
```

## lo que responde es un Json con un mensaje de confirmacion

```js
=============================================================================
```

# ADMIN

## Activate User ADMIN

`METODO PUT` http://localhost:3000/admin/activate_client/:id // --> id del usuario que quiera activar

requiere en su header y un params

Authorization:Bearer token

## lo que responde es un Json con un mensaje de confirmacion

```js
=============================================================================
```

## Deactivated User ADMIN

`METODO PUT` http://localhost:3000/admin/disable_client/:id // --> id del usuario que quiera desactivar

requiere en su header y un params del id de un usuario

Authorization:Bearer token

## lo que responde es un Json con un mensaje de confirmacion

```js
=============================================================================
```

## Find All User ADMIN

`METODO GET` http://localhost:3000/admin/find/clients

requiere en su header

Authorization:Bearer token

## lo que responde es un Json con todos los clientes de la base de datos;

```js
=============================================================================
```

## Find by Id ADMIN

`METODO  GET` http://localhost:3000/admin/find/clients/:id -->id del Usuario

requiere en su header y un params del id de un usuario

Authorization:Bearer token

## lo que responde es un Json del usuario elegido;

```js
=============================================================================
```

## Find All filter activate ADMIN

`METODO GET` http://localhost:3000/admin/find/clients/activate

requiere en su header

Authorization:Bearer token

## lo que responde es un Json con todos los clientes activados de la base de datos;

```js
=============================================================================
```

### Find All filter deactivated ADMIN

`METODO GET` http://localhost:3000/admin/find/clients/deactivated

requiere en su header

Authorization:Bearer token

## lo que responde es un Json con todos los clientes desactivados de la base de datos;

---

---

## Dejo un archivo donde se puede hacer todas estas Reques

```bash
./ tools / request.http
```

## solo se necesecita una Extencion de Visul Studio Code

## La App se llama `RESP client` ctrl + shfit + p ext install humao.rest-client

---

# `Gracias por la Oportunidad, en verdad lo disfrute!!`
