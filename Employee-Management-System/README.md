# Employee Management System (2025)

A comprehensive RESTful API for managing employees, built with Spring Boot, Spring Data JPA, MySQL, and Spring Security. This system follows best practices for enterprise-level application development with a clean layered architecture.

## 🚀 Features

- **RESTful APIs** for complete CRUD operations (Create, Read, Update, Delete)
- **Layered Architecture** (Controller → Service → Repository) for clean code and maintainability
- **Spring Data JPA** with ORM for efficient database operations
- **MySQL Database** for reliable data storage
- **Bean Validation** for input correctness and data integrity
- **Robust Exception Handling** with global exception handler
- **Spring Security** for securing API endpoints
- **Maven** for dependency management and build automation
- **Modular and Scalable** design following best practices

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 17** or higher
- **Maven 3.6+**
- **MySQL 8.0+** (or compatible version)
- **Postman** (for API testing)

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: MySQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security
- **Validation**: Jakarta Bean Validation
- **Lombok**: For reducing boilerplate code

## 📁 Project Structure

```
Employee-Management-System/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── employee/
│   │   │           └── management/
│   │   │               ├── EmployeeManagementSystemApplication.java
│   │   │               ├── config/
│   │   │               │   └── SecurityConfig.java
│   │   │               ├── controller/
│   │   │               │   └── EmployeeController.java
│   │   │               ├── dto/
│   │   │               │   ├── EmployeeRequest.java
│   │   │               │   └── EmployeeResponse.java
│   │   │               ├── entity/
│   │   │               │   └── Employee.java
│   │   │               ├── exception/
│   │   │               │   ├── DuplicateResourceException.java
│   │   │               │   ├── GlobalExceptionHandler.java
│   │   │               │   └── ResourceNotFoundException.java
│   │   │               ├── repository/
│   │   │               │   └── EmployeeRepository.java
│   │   │               └── service/
│   │   │                   └── EmployeeService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-dev.properties
├── pom.xml
└── README.md
```

## 🏗️ Architecture

The application follows a **layered architecture** pattern:

1. **Controller Layer**: Handles HTTP requests and responses
2. **Service Layer**: Contains business logic
3. **Repository Layer**: Handles database operations
4. **Entity Layer**: Represents database tables
5. **DTO Layer**: Data Transfer Objects for request/response
6. **Exception Layer**: Centralized exception handling
7. **Config Layer**: Configuration classes (Security, etc.)

## 🗄️ Database Setup

1. **Create MySQL Database**:
   ```sql
   CREATE DATABASE employee_db;
   ```

2. **Update Database Credentials** in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

   The application will automatically create the `employees` table on startup.

## 🚀 Running the Application

### Option 1: Using Maven

```bash
# Navigate to project directory
cd Employee-Management-System

# Run the application
mvn spring-boot:run
```

### Option 2: Using IDE

1. Import the project as a Maven project in your IDE (IntelliJ IDEA, Eclipse, etc.)
2. Run `EmployeeManagementSystemApplication.java` as a Java application

The application will start on **http://localhost:8080**

## 🔐 Security Configuration

The application uses **HTTP Basic Authentication**. Default credentials:

- **Username**: `admin` | **Password**: `admin123`
- **Username**: `user` | **Password**: `user123`

**Note**: Change these credentials in production environments!

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api/employees
```

### 1. Create Employee
- **Method**: `POST`
- **URL**: `/api/employees`
- **Authentication**: Required
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "department": "Engineering",
  "position": "Software Engineer",
  "salary": 75000.00
}
```
- **Response**: `201 Created` with employee details

### 2. Get All Employees
- **Method**: `GET`
- **URL**: `/api/employees`
- **Authentication**: Required
- **Response**: `200 OK` with list of employees

### 3. Get Employee by ID
- **Method**: `GET`
- **URL**: `/api/employees/{id}`
- **Authentication**: Required
- **Response**: `200 OK` with employee details

### 4. Update Employee
- **Method**: `PUT`
- **URL**: `/api/employees/{id}`
- **Authentication**: Required
- **Request Body**: Same as Create Employee
- **Response**: `200 OK` with updated employee details

### 5. Delete Employee
- **Method**: `DELETE`
- **URL**: `/api/employees/{id}`
- **Authentication**: Required
- **Response**: `204 No Content`

## 🧪 Testing with Postman

### Setting Up Authentication

1. Open Postman
2. Select your request method (GET, POST, PUT, DELETE)
3. Go to the **Authorization** tab
4. Select **Basic Auth**
5. Enter username: `admin` and password: `admin123`
6. Send the request

### Example Requests

#### Create Employee
```
POST http://localhost:8080/api/employees
Authorization: Basic Auth (admin/admin123)
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1987654321",
  "department": "Marketing",
  "position": "Marketing Manager",
  "salary": 85000.00
}
```

#### Get All Employees
```
GET http://localhost:8080/api/employees
Authorization: Basic Auth (admin/admin123)
```

#### Get Employee by ID
```
GET http://localhost:8080/api/employees/1
Authorization: Basic Auth (admin/admin123)
```

#### Update Employee
```
PUT http://localhost:8080/api/employees/1
Authorization: Basic Auth (admin/admin123)
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1987654321",
  "department": "Marketing",
  "position": "Senior Marketing Manager",
  "salary": 95000.00
}
```

#### Delete Employee
```
DELETE http://localhost:8080/api/employees/1
Authorization: Basic Auth (admin/admin123)
```

## ✅ Validation Rules

The application enforces the following validation rules:

- **First Name**: Required, 2-50 characters
- **Last Name**: Required, 2-50 characters
- **Email**: Required, valid email format, unique
- **Phone Number**: Required, valid phone format
- **Department**: Required, 2-100 characters
- **Position**: Required, 2-100 characters
- **Salary**: Required, must be greater than 0

## 🚨 Error Handling

The application provides comprehensive error handling:

- **400 Bad Request**: Validation errors
- **404 Not Found**: Resource not found
- **409 Conflict**: Duplicate resource (e.g., duplicate email)
- **500 Internal Server Error**: Server errors

### Example Error Response
```json
{
  "timestamp": "2025-01-15T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Input validation failed",
  "errors": {
    "email": "Email should be valid",
    "salary": "Salary must be greater than 0"
  }
}
```

## 📦 Dependencies

Key dependencies used in this project:

- `spring-boot-starter-web`: Web framework
- `spring-boot-starter-data-jpa`: JPA and Hibernate
- `spring-boot-starter-security`: Security framework
- `spring-boot-starter-validation`: Bean validation
- `mysql-connector-j`: MySQL database driver
- `lombok`: Reduces boilerplate code
- `spring-boot-devtools`: Development tools

## 🔧 Configuration

### Application Properties

Key configuration options in `application.properties`:

- **Server Port**: 8080
- **Database**: MySQL (employee_db)
- **JPA**: Auto-update schema on startup
- **Logging**: Debug level for development

## 🎯 Best Practices Implemented

1. **Separation of Concerns**: Clear layer separation
2. **DRY Principle**: Reusable code and methods
3. **Exception Handling**: Centralized exception management
4. **Validation**: Input validation at multiple levels
5. **Security**: API endpoint protection
6. **RESTful Design**: Standard HTTP methods and status codes
7. **DTO Pattern**: Separate request/response objects
8. **Transaction Management**: `@Transactional` for data consistency
9. **Code Documentation**: Clear naming and structure

## 🚀 Future Enhancements

Potential improvements for the system:

- [ ] Pagination and sorting for employee list
- [ ] Search and filtering capabilities
- [ ] JWT-based authentication
- [ ] Role-based access control (RBAC)
- [ ] Unit and integration tests
- [ ] API documentation with Swagger/OpenAPI
- [ ] Docker containerization
- [ ] CI/CD pipeline integration
- [ ] Caching mechanism
- [ ] Audit logging

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Employee Management System - 2025

## 📞 Support

For issues or questions, please create an issue in the project repository.

---

**Built with ❤️ using Spring Boot**

