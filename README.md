# Project Repository

This repository contains a full-stack application with the following structure:

- **`asm1_fe_client`**: React frontend for the client-side.
- **`asm1_fe_admin`**: React frontend for the admin-side.
- **`asm1_be`**: Java Spring Boot backend.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** and **npm** for managing React projects
- **Java Development Kit (JDK)** for the Spring Boot backend
- **Maven** for building the Spring Boot backend

### Installation and Running

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Set executable permissions for shell scripts:**

   ```bash
   chmod 777 *.sh
   ```

   ```bash
   ./install-be.sh
   ```

   ```bash
   ./install-fe-admin.sh
   ```

   ```bash
   ./install-fe-client.sh
   ```

3. **Run app:**

   ```bash
   cd asm1_be
   ./mvnw spring-boot:run
   ```

   ```bash
   cd ../asm1_fe_admin
   yarn start
   ```

   ```bash
   cd ../asm1_fe_client
   yarn start
   ```
