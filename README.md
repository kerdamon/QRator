# QRator Project Plan

This document outlines the plan for the QRator project, including the tech stack, architecture, and development practices.

## 1. Application Architecture

### Monorepo
The project will be structured as a monorepo using **pnpm workspaces**. This will allow us to manage the `frontend` and `backend` packages in a single repository, simplifying dependency management and code sharing.

### Backend
The backend will be an **Express.js** application with two separate ports:
1.  **Public Port**: For handling redirections (e.g., `/:name`).
2.  **Private Port**: For the management API (e.g., creating, updating, and listing addresses).

The API will be documented using **Swagger/OpenAPI**.

### Frontend
The frontend will be a **React** application built with **Vite**. It will consume the management API from the backend to provide a user interface for managing addresses.

### Database
-   **Redis** will be used to store the mapping between the short name and the destination URL. The key will be the `name` of the address, and the value will be the `destinationUrl`.
-   For the MVP, the rest of the metadata for the addresses (owner, creation time, etc.) will also be stored in Redis. In the future, a more scalable solution might be considered.

## 2. Tech Stack

### Frontend
-   **TypeScript**
-   **React** (with **Vite** for development)
-   **Tailwind CSS**
-   **shadcn/ui**

### Backend
-   **TypeScript**
-   **Express.js**

### Database
-   **Redis**: For storing key-value data for redirections.

### Testing
-   **Jest**: For unit and integration tests.
-   **Cypress**: For end-to-end tests.

### Tooling
-   **`commitlint`**: To enforce a consistent commit message format.
-   **`Swagger`/`OpenAPI`**: For API documentation.

## 3. Project Structure
The project will be organized as a monorepo with the following structure:
```
/
├── apps/
│   ├── frontend/   # React frontend application
│   └── backend/    # Express.js backend application
├── packages/
│   └── shared/     # Shared code between frontend and backend
├── pnpm-workspace.yaml
└── package.json
```

## 4. Development Environment (Devbox)
The project uses **`devbox`** to create a consistent and reproducible development environment. The `devbox.json` file will define all the necessary packages and tools, such as Node.js, pnpm, and any other system-level dependencies. This ensures that all developers have the same environment setup.

## 5. Deployment (Dokploy)

The application will be deployed using **Dokploy**. We will have three environments:

### Environments

#### Development (`dev`)
-   **Branch**: `main`
-   **Domain**: `dev.qrator.kered.pl`
-   **Deployment**: Automatically deployed on every push to the `main` branch.

#### Staging (`staging`)
-   **Branch**: `release/vX-Y-Z`
-   **Domain**: `vX-Y-Z.staging.qrator.kered.pl` (e.g., `v1-0-0.staging.qrator.kered.pl`)
-   **Deployment**: A staging environment will be created for each release branch. This environment will be used for testing and verification before a production release. The staging environment will be destroyed after the release is published.

#### Production (`prod`)
-   **Branch**: A release tag (e.g., `v1.0.0`)
-   **Domain**: `qrator.kered.pl`
-   **Deployment**: Production releases will be triggered manually by creating a new release on GitHub.

### GitHub Release Flow
1.  When the `main` branch has all the desired features for a new release, a `release/vX.Y.Z` branch is created.
2.  A pull request is opened for the release branch. This will trigger the CI pipeline, which will run tests and security scans.
3.  Once the pull request is merged, a draft release is created on GitHub.
4.  The release is manually published from the draft. This will trigger the production deployment on Dokploy.
