# 🎓 School-Flow

<div align="center">

![School-Flow Banner](https://img.shields.io/badge/School--Flow-v1.0.0-6366f1?style=for-the-badge&logo=graduation-cap&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react&logoColor=black)
![Java](https://img.shields.io/badge/Java-17+-f89820?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6db33f?style=for-the-badge&logo=springboot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)

**A modern, full-stack school management system built with React + Spring Boot.**  
Clean UI inspired by GitHub, Linear and Vercel. Complete CRUD for all academic entities.

[Live Demo](#) · [Backend Repo](#) · [Report a Bug](#) · [Request Feature](#)

</div>

---

## 📸 Preview

## 🧱 Tech Stack

### Frontend
| Tech | Version | Purpose |
|------|---------|---------|
| React | 18.3 | UI Library |
| React Router DOM | 6.x | Client-side routing |
| Vite | 5.x | Build tool & dev server |
| CSS puro | — | Styling (no Tailwind, no UI lib) |

### Backend
| Tech | Version | Purpose |
|------|---------|---------|
| Java | 17+ | Language |
| Spring Boot | 3.x | Framework |
| Spring Security | 3.x | Authentication (Basic Auth) |
| Spring Data JPA | 3.x | ORM / Database access |
| PostgreSQL | 16 | Relational database |
| Maven | 3.x | Build tool |

---

## 🚀 Features

### Frontend
- 🌑 **Dark theme** profissional — inspirado em GitHub, Linear e Vercel
- 🔍 **Global search** — busca em tempo real em todas as entidades com `Ctrl+K`
- 📊 **Dashboard** com cards de estatísticas conectados à API
- 🗂️ **CRUD completo** para Students, Teachers, Courses, Classrooms e Enrollments
- 🪟 **Modal reutilizável** (`AddModal`) — o mesmo componente serve para criar e editar qualquer entidade
- 🔎 **Filtro por status** na página de Enrollments (Active / Pending / Completed / Cancelled)
- 👤 **Student Details** — página de detalhe com enrollments, cursos e salas vinculadas
- 📱 **Responsivo** — funciona em mobile com sidebar em overlay
- 🍞 **Breadcrumb dinâmico** na navbar
- 🔔 **Toast notifications** — feedback visual para todas as ações (create, update, delete)
- ⌨️ **Keyboard navigation** no search modal (`↑↓` e `Enter`)

### Backend
- ⚙️ **REST API** completa com Spring Boot
- 🔐 **Spring Security** com Basic Authentication
- 🗄️ **PostgreSQL** como banco de dados relacional
- 📦 **JPA / Hibernate** para mapeamento objeto-relacional
- 🔄 **Endpoints CRUD** para todas as entidades do sistema
- 🌐 **CORS** configurado para integração com o frontend

---

## 📁 Project Structure

```
school-flow/
│
├── 📂 backend/                     # Spring Boot API
│   ├── src/main/java/
│   │   └── com/school/
│   │       ├── controllers/        # REST Controllers
│   │       │   ├── StudentController.java
│   │       │   ├── TeacherController.java
│   │       │   ├── CourseController.java
│   │       │   ├── ClassroomController.java
│   │       │   ├── EnrollmentController.java
│   │       │   └── UserController.java
│   │       ├── models/             # JPA Entities
│   │       ├── repositories/       # Spring Data Repositories
│   │       ├── services/           # Business Logic
│   │       └── config/             # Security & CORS config
│   └── src/main/resources/
│       └── application.properties
│
└── 📂 frontend/school-flow/        # React App
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx         # Fixed sidebar with navigation
    │   │   ├── Navbar.jsx          # Top bar with global search (⌘K)
    │   │   ├── Card.jsx            # Stat cards for dashboard
    │   │   ├── Table.jsx           # Reusable data table
    │   │   ├── AddModal.jsx        # Reusable create/edit modal
    │   │   └── ToastContainer.jsx  # Toast notifications
    │   ├── pages/
    │   │   ├── Dashboard.jsx       # Overview with live stats
    │   │   ├── Students.jsx        # Student CRUD
    │   │   ├── StudentDetails.jsx  # Student detail view
    │   │   ├── Teachers.jsx        # Teacher CRUD
    │   │   ├── Courses.jsx         # Course CRUD
    │   │   ├── Classrooms.jsx      # Classroom CRUD
    │   │   ├── Enrollments.jsx     # Enrollment CRUD + status filter
    │   │   └── Login.jsx           # Login page
    │   ├── services/
    │   │   └── api.js              # All API calls (fetch)
    │   ├── hooks/
    │   │   └── useToast.js         # Toast notification hook
    │   ├── styles/
    │   │   └── global.css          # Design system (CSS variables)
    │   ├── App.jsx                 # Router + layout
    │   └── main.jsx                # Entry point
    ├── vite.config.js              # Proxy to backend
    └── .env                        # Environment variables
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+
- **Java** 17+
- **Maven** 3.8+
- **PostgreSQL** 14+

---

### 1. Clone the repository

```bash
git clone https://github.com/viniciusfonseca19/school-flow.git
cd school-flow
```

---

### 2. Backend setup

#### Configure the database

Create a database in PostgreSQL:

```sql
CREATE DATABASE schoolflow;
```

#### Configure `application.properties`

```properties
# src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:5432/schoolflow
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

#### Run the backend

```bash
cd backend
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

---

### 3. Frontend setup

```bash
cd frontend/school-flow
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

> The Vite proxy automatically forwards all API calls to `http://localhost:8080` — no CORS issues during development.

---

## 🔌 API Endpoints

Base URL: `http://localhost:8080`

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/students` | List all students |
| `GET` | `/students/{id}` | Get student by ID |
| `POST` | `/students` | Create new student |
| `PUT` | `/students/{id}` | Update student |
| `DELETE` | `/students/{id}` | Delete student |

### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/teachers` | List all teachers |
| `GET` | `/teachers/{id}` | Get teacher by ID |
| `POST` | `/teachers` | Create new teacher |
| `PUT` | `/teachers/{id}` | Update teacher |
| `DELETE` | `/teachers/{id}` | Delete teacher |

### Courses
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/courses` | List all courses |
| `GET` | `/courses/{id}` | Get course by ID |
| `POST` | `/courses` | Create new course |
| `PUT` | `/courses/{id}` | Update course |
| `DELETE` | `/courses/{id}` | Delete course |

### Classrooms
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/classrooms` | List all classrooms |
| `GET` | `/classrooms/{id}` | Get classroom by ID |
| `POST` | `/classrooms` | Create new classroom |
| `PUT` | `/classrooms/{id}` | Update classroom |
| `DELETE` | `/classrooms/{id}` | Delete classroom |

### Enrollments
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/enrollments` | List all enrollments |
| `GET` | `/enrollments/{id}` | Get enrollment by ID |
| `POST` | `/enrollments` | Create new enrollment |
| `PUT` | `/enrollments/{id}` | Update enrollment |
| `DELETE` | `/enrollments/{id}` | Delete enrollment |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | List all users |
| `POST` | `/users` | Create new user |
| `PUT` | `/users/{id}` | Update user |
| `DELETE` | `/users/{id}` | Delete user |

---

## 🎨 Design System

The entire UI is built on a CSS variable-based design system defined in `global.css`.

```css
/* Color palette */
--bg-base:        #0a0a0f   /* Deepest background */
--bg-surface:     #111118   /* Cards, sidebar */
--accent:         #6366f1   /* Indigo — primary action color */
--text-primary:   #e8e8f0   /* Main text */
--text-secondary: #9090a8   /* Labels, subtitles */

/* Typography */
--font-sans: 'Instrument Sans'  /* UI text */
--font-mono: 'Geist Mono'       /* Code, IDs, versions */
```

---

## 🔐 Authentication

The backend uses **Spring Security Basic Auth**. To integrate with the frontend, add the `Authorization` header in `src/services/api.js`:

```js
headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Basic ' + btoa('username:password'),
}
```

> JWT upgrade is planned for a future release.

---

## 📦 Building for Production

### Frontend

```bash
cd frontend/school-flow
npm run build
```

Output will be in `dist/`. Update `.env` for production:

```env
VITE_API_URL=https://your-api-domain.com
```

### Backend

```bash
cd backend
mvn clean package
java -jar target/school-flow-1.0.0.jar
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Vinicius Fonseca**

[![GitHub](https://img.shields.io/badge/GitHub-viniciusfonseca19-181717?style=for-the-badge&logo=github)](https://github.com/viniciusfonseca19)

---

<div align="center">

Made with ☕ and Java + React

⭐ **Star this repo if you found it useful!**

</div>
