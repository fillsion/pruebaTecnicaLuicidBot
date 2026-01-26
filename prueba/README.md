Para esta prueba debes consumir la API de Google Books para buscar libros:

GET https://www.googleapis.com/books/v1/volumes?q={search terms}

Para conocer el formato exacto de la respuesta, consulta la documentación oficial del endpoint “Volumes list”:
https://developers.google.com/books/docs/v1/reference/volumes/list

Objetivo

Implementar un Search Bar que permita buscar y mostrar los resultados de forma organizada (mínimo título e ID).

Requisitos de UI

Mostrar los resultados en una tabla/lista.

Incluir paginación para poder navegar y mostrar hasta 50 ítems.

Estructura requerida del código

Debes implementar el flujo siguiendo esta arquitectura:

services → actions → hook → component

Services: lógica de consumo de la API de Google Books (request, params, manejo de respuesta).

Actions: lógica propia del negocio (transformaciones, validaciones, normalización de datos, etc.).

Hook: lógica del llamado usando TanStack Query / React Query (loading, error, paginación).

Axios y tanstack query ya estan instalados

Component: presentación de UI y render de los datos obtenidos.

Tiempo

Tendrás 1 hora para completar el reto.