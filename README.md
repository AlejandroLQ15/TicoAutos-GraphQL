# TicoAutos — GraphQL

Este es un **servidor aparte** que lee y escribe en **la misma base MongoDB** que usa el backend REST. Sirve para consultas tipo “traeme autos con filtros” usando GraphQL en lugar de pegarle solo al REST.

No es obligatorio para que la app web funcione: si solo probás la página y el REST, podés ignorar esta carpeta tranquilo.

## Stack

- Apollo Server  
- GraphQL  
- Mongoose  

## Arranque

```bash
cp .env.example .env
npm install
npm start
```

Suele quedar en **`http://localhost:4000`** (mirá la consola si cambiaste `PORT`).

### Variables que tienen que cuadrar con el REST

- **`JWT_SECRET`** (o la misma clave que use el backend): GraphQL confía en el mismo token que te dio el login REST.
- **URI de Mongo**: misma base que el backend (`MONGO_URI` / `MONGODB_URI`, según el ejemplo).

Si una cosa no coincide, vas a ver rechazos de sesión o datos que no son los que cargaste por REST.

## Cómo mandar el token

En cada pedido GraphQL:

```http
Authorization: Bearer <tu JWT del login REST>
```

Si falta el token o está mal/expirado, la respuesta va como no autenticado (`UNAUTHENTICATED`).

## Ejemplos de consultas

### Listar vehículos

```graphql
query {
  vehicles {
    id
    marca
    modelo
    anio
    precio
    estado
    owner {
      id
      username
      nombre
    }
  }
}
```

### Detalle por id

```graphql
query VehicleById($id: ID!) {
  vehicle(id: $id) {
    id
    marca
    modelo
    anio
    precio
    estado
    fotos
    kilometraje
    tipoCombustible
    tipoTransmision
    provincia
    owner {
      id
      username
      nombre
    }
  }
}
```

### Filtros en `vehicles`

Opcionales: `marca`, `modelo`, `minPrecio`, `maxPrecio`, `minAnio`, `maxAnio`, `page`, `limit`.

## Repo padre

Diagramas y vista general: carpeta `docs/` en la raíz del proyecto completo.
