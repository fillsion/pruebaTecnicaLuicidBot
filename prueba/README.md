# Prueba Técnica React - Gestión de Tareas

## Contexto

Necesitamos construir una pequeña aplicación en React para gestionar tareas. La aplicación debe permitir crear tareas, listarlas, filtrarlas, buscarlas, cambiar su estado y eliminarlas.

## Requisitos técnicos

- Los datos pueden manejarse en memoria usando estado local de React.
- El código debe ser desarrollado en TypeScript.

## Duración estimada

Máximo 90 minutos.

## Objetivo

Crear una aplicación que permita visualizar y gestionar una lista de tareas.

## Modelo de datos

Puedes usar este modelo como referencia:

```ts
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: "low" | "medium" | "high";
};
```

datos iniciales

```ts
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Revisar pull request",
    completed: false,
    createdAt: "2026-04-20",
    priority: "high",
  },
  {
    id: "2",
    title: "Actualizar documentación",
    completed: true,
    createdAt: "2026-04-21",
    priority: "medium",
  },
  {
    id: "3",
    title: "Corregir estilos del dashboard",
    completed: false,
    createdAt: "2026-04-22",
    priority: "low",
  },
];
```

## Arquitectura requerida

Debes implementar el flujo siguiendo esta arquitectura:

`services -> actions -> hook -> component`

- `hook`: manejo de estado, queries y mutaciones.
- `component`: solo presentación e interacción de UI.

## Consumo de endpoints

Debes usar los endpoints del proyecto para gestionar tareas:

- `GET /api/tasks`: listar tareas.
- `POST /api/tasks`: crear tarea.
- `GET /api/tasks/:id`: obtener tarea por id.
- `PATCH /api/tasks/:id`: actualizar tarea.
- `DELETE /api/tasks/:id`: eliminar tarea.

### Ejemplos rápidos (curl / Postman)

Crear tarea (`POST /api/tasks`):

```bash
curl --request POST "http://localhost:3000/api/tasks" \
  --header "Content-Type: application/json" \
  --data-raw "{\"title\":\"Aprender React Query\",\"priority\":\"medium\"}"
```

Actualizar tarea (`PATCH /api/tasks/:id`):

```bash
curl --request PATCH "http://localhost:3000/api/tasks/1" \
  --header "Content-Type: application/json" \
  --data-raw "{\"title\":\"Aprender React Query (editado)\",\"completed\":true,\"priority\":\"high\"}"
```

## Estado y data-fetching

TanStack Query ya está instalado en el proyecto y **debe usarse** para consultas y mutaciones.

La lógica de data-fetching y actualización de estado debe centralizarse dentro de un hook (por ejemplo `useTasks`), no directamente en los componentes.
