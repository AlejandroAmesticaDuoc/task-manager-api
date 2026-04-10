# Task Manager API

API REST sencilla para gestionar tareas, hecha con Node.js y Express.  
Este proyecto es la base para armar el pipeline DevOps del ramo **Ingeniería DevOps (DOY0101)** en Duoc UC.

## Integrante

| Nombre | Usuario GitHub |
|--------|---------------|
| Alejandro Amestica | [@AlejandroAmesticaDuoc](https://github.com/AlejandroAmesticaDuoc) |

## ¿Qué hace este proyecto?

Es un microservicio básico tipo CRUD para manejar tareas. Se guardan en memoria (no usa base de datos) porque el foco del trabajo está en el flujo DevOps, no en la persistencia de datos.

### Endpoints disponibles

| Método | Ruta | Qué hace |
|--------|------|----------|
| GET | `/health` | Verifica que el servicio esté corriendo |
| GET | `/api/tasks` | Trae todas las tareas |
| GET | `/api/tasks/:id` | Trae una tarea específica |
| POST | `/api/tasks` | Crea una tarea nueva |
| PUT | `/api/tasks/:id` | Modifica una tarea |
| DELETE | `/api/tasks/:id` | Elimina una tarea |

### Estructura del proyecto

```
task-manager-api/
├── .github/
│   └── workflows/        # Archivo de GitHub Actions para CI
├── src/
│   ├── app.js            # Archivo principal, levanta Express
│   ├── controllers/      # Lógica de cada endpoint
│   ├── models/           # Modelo de datos (en memoria)
│   └── routes/           # Rutas de la API
├── tests/                # Tests con Jest
├── .gitignore
├── eslint.config.js
├── package.json
└── README.md
```

## Cómo correr el proyecto

```bash
# Clonar
git clone https://github.com/AlejandroAmesticaDuoc/task-manager-api.git
cd task-manager-api

# Instalar dependencias
npm install

# Levantar en modo desarrollo
npm run dev

# Correr los tests
npm test

# Correr el linter
npm run lint
```

## Estrategia de ramificación

### ¿Qué elegimos y por qué?

Elegimos **GitFlow** como estrategia de ramificación. La razón principal es que nos permite tener bien separado lo que está en "producción" (rama `main`) de lo que todavía se está desarrollando (rama `develop`).

En el contexto de un entorno cloud, esto tiene sentido porque:

- `main` sería lo que está desplegado y funcionando. No se toca directo, siempre llegan cambios por PR.
- `develop` es donde se van juntando las features antes de mandarlas a producción.
- Si hay un bug urgente en producción, se puede hacer un `hotfix` desde `main` sin tener que esperar a que se termine todo lo que está en develop.

También consideramos GitHub Flow y trunk-based, pero GitFlow nos pareció más adecuado para este tipo de proyecto donde hay releases más controlados y necesitamos practicar el flujo completo con PRs.

### Comparación rápida con otras estrategias

| Estrategia | Lo bueno | Lo malo | Sirve para... |
|-----------|----------|---------|---------------|
| **GitFlow** | Orden claro, soporta hotfixes, bueno para releases | Tiene más ramas, puede ser mucho para equipos chicos | Proyectos con releases planificados |
| **GitHub Flow** | Más simple, solo main y ramas de feature | No tiene develop, menos control | Deploy continuo, equipos chicos |
| **Trunk-Based** | Integración rápida, pocas ramas | Se necesita muy buena cobertura de tests | Equipos con CI/CD muy maduro |

### Flujo visual (simplificado)

```
main:     ●────────────────●───────────────●
           \              / \             /
develop:    ●──●──●──●──●    ●──●──●──●──●
               \     /          \   /
feature/*:      ●──●             ●──●
                         \
hotfix/*:                 ●──●
```

## Ramas

| Rama | Para qué sirve | Desde dónde se crea |
|------|----------------|---------------------|
| `main` | Código estable, "producción" | - |
| `develop` | Integración de features | - |
| `feature/<nombre>` | Desarrollar algo nuevo | Desde `develop` |
| `hotfix/<nombre>` | Arreglar bugs urgentes en prod | Desde `main` |

## Convenciones de commits

Usamos **Conventional Commits** para que el historial de git sea más fácil de leer.

### Formato básico

```
tipo(scope): descripción corta
```

### Tipos que usamos

| Tipo | Cuándo usarlo | Ejemplo |
|------|--------------|---------|
| `feat` | Algo nuevo | `feat(tasks): add filtering by status` |
| `fix` | Arreglo de bug | `fix(api): handle null task title` |
| `docs` | Documentación | `docs(readme): update install steps` |
| `test` | Agregar o cambiar tests | `test(tasks): add delete edge case` |
| `refactor` | Cambiar código sin cambiar funcionalidad | `refactor(controller): simplify error handling` |
| `chore` | Mantenimiento, deps, configs | `chore(deps): update express` |
| `ci` | Cambios en el pipeline | `ci(actions): add lint step` |

### Algunas reglas

- Escribir en inglés y en imperativo ("add", "fix", no "added", "fixed")
- Que la descripción no sea muy larga (máx ~72 caracteres)
- El scope es opcional pero ayuda a saber qué parte del código se tocó

## Flujo de trabajo con PRs

Así es como trabajamos para meter cambios al repo:

1. Crear una rama desde `develop` (o desde `main` si es hotfix)
2. Hacer los commits con las convenciones de arriba
3. Subir la rama y abrir un **Pull Request** en GitHub
4. Revisar el código (al menos alguien del equipo tiene que aprobarlo)
5. El CI pasa los tests y el lint automáticamente
6. Si todo está ok, se hace merge
7. Se borra la rama después del merge

**Importante**: nunca se hace push directo a `main` ni a `develop`. Todo pasa por PR.

Para los hotfixes, después del merge a `main` también hay que mergear a `develop` para que el fix quede en ambas ramas.

## CI/CD - GitHub Actions

Tenemos un workflow básico de GitHub Actions que corre automáticamente cuando:

- Se hace **push a `develop`**
- Se abre un **pull request hacia `main`**

### ¿Qué hace el pipeline?

```
Push/PR → Instala dependencias → Corre el linter → Corre los tests → ✅ o ❌
```

Esto nos sirve para asegurarnos de que el código que se integra no rompe nada. Es la primera etapa de un pipeline CI/CD; más adelante se podría agregar deploy automático.

## Versionamiento

Seguimos **Semantic Versioning** (SemVer): `MAJOR.MINOR.PATCH`

- **MAJOR**: Cambios que rompen compatibilidad
- **MINOR**: Features nuevas que no rompen nada
- **PATCH**: Fixes y correcciones menores

Ejemplo: `1.0.0` → `1.1.0` (feature nueva) → `1.1.1` (fix)

## Uso de IA en el proyecto

Se usó **Claude (Anthropic)** como apoyo para:
- Apoyo con la redacción de documentación del README
- Ayuda en la configuración de GitHub Actions
- Ayuda con los titulos y descripciones en los PR y demas

Las decisiones técnicas (elección de GitFlow, convenciones, estructura) fueron tomadas y revisadas por el equipo. Todo el contenido generado con IA fue validado antes de incluirse.

Referencia: https://bibliotecas.duoc.cl/ia

## Conclusiones

### Reflexión individual — Alejandro Amestica

La verdad es que hacer este proyecto solo fue complicado al principio, porque el encargo está pensado para parejas y tuve que cubrir todo yo. Pero al final creo que eso me sirvió bastante, porque no me quedó otra que entender cada parte del proceso desde armar la API con Express hasta dejar el pipeline funcionando.

Lo que más me costó fue implementar GitFlow en la práctica. En clases uno ve los diagramas con main, develop, feature y hotfix y parece directo, pero cuando ya estás creando las ramas, abriendo PRs y haciendo los merges te das cuenta de que hay hartos detalles que importan. Por ejemplo, que el hotfix tiene que ir a main pero también hay que bajarlo a develop para que el fix no se pierda, o que nunca deberías hacer push directo a main. Son cosas que hasta que no las haces no las internalizas bien.

GitHub Actions fue otra cosa que me llevó un rato. Nunca había armado un workflow desde cero y me equivoqué varias veces con la sintaxis del YAML y con los triggers del push y pull request. Pero cuando vi que el linter y los tests corrían solos con cada push a develop fue bastante satisfactorio, porque ahí entendí el sentido real del CI.

También rescato que me obligué a seguir las convenciones de commits desde el principio. Antes no le daba mucha importancia a los mensajes de commit, pero usando Conventional Commits el historial queda mucho más limpio y se entiende rápido qué se hizo en cada cambio sin tener que revisar el código.

En general siento que este trabajo me ayudó a entender el ciclo completo de desarrollo con enfoque DevOps. Antes veía el CI/CD como algo lejano y complejo, pero armándolo desde cero con un microservicio real me di cuenta de que es alcanzable y que realmente marca la diferencia en cómo se mantiene un proyecto.
