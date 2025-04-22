# Rocketbot-todo

### Descripción

Este proyecto es una solución para la prueba dada por Rocketbot sobre "To Do"

---

### Construcción 🛠️

* **Tipo:** Aplicación web con backend y frontend.  
* **Lenguaje:** Node.js (backend).  
* **Frameworks:** Express (backend), React (frontend).  
* **Contenedores:** Docker y Docker Compose para orquestación.  
* **Base de datos:** MySQL 9.3.0.  

---

### Pre-requisitos 📋

- Docker y Docker Compose instalados.  
- Acceso a GitHub para clonar el repositorio.  
- Variables de entorno configuradas en archivos `.env` para backend y frontend.  

---

### Instalación 🔧

1. Clona el repositorio:
    ```
    git clone git@github.com:Vungyr/Rocketbot-todo.git
    cd Rocketbot-todo
    ```

2. Copia los archivos de variables de entorno para backend(pasados en el correo) y frontend, ambos desde el .env.example


3. Construye y levanta los contenedores con Docker Compose:

    ```
    docker-compose up --build
    ```

Esto levantará los servicios:

- `todo_mysql` (MySQL 9.3.0)  
- `todo_backend` (Node.js backend)  
- `todo_frontend` (React + Nginx frontend)  

El backend esperará a que MySQL esté listo antes de iniciar, gracias al script `wait-for-it.sh`.

---

### Pruebas ⚙️

Para correr las pruebas dentro del contenedor backend ejecuta el comando:
docker exec -ti todo_backend npm test

