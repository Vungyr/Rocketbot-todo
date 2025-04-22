# Rocketbot-todo

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
  
  ![image](https://github.com/user-attachments/assets/f035f4a4-2344-4e9d-a5cf-5c986fc54e3c)
  ![image](https://github.com/user-attachments/assets/b244bb30-8374-4338-b5aa-302ddd5810a4)


El backend esperará a que MySQL esté listo antes de iniciar, gracias al script `wait-for-it.sh`.

---

### Pruebas ⚙️

Para correr las pruebas dentro del contenedor backend ejecuta el comando:
- `docker exec -ti todo_backend npm test`
![image](https://github.com/user-attachments/assets/facef3b1-eb41-452a-aa83-4d737b6faa8a)

### Loging ⚙️
Tambien se inserto un middleware para logeo de los distintos llamados que se realizan en el backend para el ambiente de pruebas, y asi tener un mejor trackeo del flujo de informacion.
![image](https://github.com/user-attachments/assets/18e558b2-5615-4cf8-92be-e0562a5448bf)

### Descripción
Este proyecto es una solución para la prueba dada por Rocketbot sobre "To Do"

Una vez levantado el proyecto, podremos ingresar al frontend en el siguiente url http://localhost:3000
![image](https://github.com/user-attachments/assets/d2b6de7b-ee2f-474a-9445-b6cb4c47ddc2)
en donde si damos click este nos redireccionara a la plataforma Auth0 para realizar la authenticacion
![image](https://github.com/user-attachments/assets/7f6926fb-22a9-408c-9a7c-fed7028a9611)
una vez authenticado o registrado nuestra cuenta en Auth0 podremos ver las distintas task del usuario
![image](https://github.com/user-attachments/assets/e6a3ea15-5e4f-4852-b327-431e9a395151)
en donde podremos crear tareas, marcarlas como hechas o eliminarlas
![image](https://github.com/user-attachments/assets/f7fb0b74-8bab-4fd2-8891-164451ae25db)
![image](https://github.com/user-attachments/assets/fdd64abc-1076-42cf-98e4-fae734ef492c)
tambien tenemos el boton cerrar sesion en donde podremos dar por terminada la sesion actual del usuario y logearse con otra cuenta
![image](https://github.com/user-attachments/assets/9acc87ec-9634-4507-b97e-e410f12f2843)

por detras el flujo en el backend seria algo asi

Frontend (React SPA)

    /auth/login: redirige al backend para login con Auth0.

    /tasks: Consume CRUD protegido con JWT.

Backend (Express)

    /auth/login: redirige a Auth0.

    /auth/callback: intercambia código Auth0 por token, upsert user, devuelve JWT al frontend.

    /tasks: Publica CRUD protegido con JWT.

Base de Datos (MySQL)

    users: usuarios con auth0Id.

    tasks: tareas asociadas a usuarios.



