# TicoAutos-GraphQL

Servicio GraphQL independiente para optimizar lecturas de TicoAutos usando la misma base de datos MongoDB del backend REST.

## Stack

- Apollo Server
- GraphQL
- Mongoose

## Configuracion

1. Copia `.env.example` a `.env`
2. Ajusta `MONGODB_URI` (o `MONGO_URI`) para apuntar a la misma base que usa el backend REST
3. Configura `JWT_SECRET` con la misma clave que usa el backend REST para el login
4. Instala dependencias:

```bash
npm install
```

4. Ejecuta:

```bash
npm start
```

Por defecto queda en `http://localhost:4000/`.

## Autenticacion JWT

Este servicio valida el mismo JWT emitido por el login REST en cada request GraphQL.

Envia el token en el header:

```http
Authorization: Bearer <token>
```

Si falta el token o es invalido/expirado, GraphQL responde `UNAUTHENTICATED`.

## Schema implementado

### Query: Listar todos los vehiculos

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

### Query: Ver detalle del vehiculo

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

### Filtros opcionales en `vehicles`

`vehicles` soporta filtros por:

- `marca`
- `modelo`
- `minPrecio`, `maxPrecio`
- `minAnio`, `maxAnio`
- `page`, `limit`
