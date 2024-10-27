# Shared Shopping List Project Documentation

## Overview

The Shared Shopping List project is a web-based application designed to
facilitate the creation and management of shopping lists. It is structured using
a 3-tier architecture: client, server, and database. This documentation provides
an overview of the project structure, features, and instructions for starting,
testing, and deploying the application.

### Source and Inspiration


## Project Structure

### Main Components

- **Client:** The user interface for interacting with the shopping list.
- **Server:** Hosts the application logic and handles requests from the client.
  The main file is `app.js`.
- **Database:** Stores data related to shopping lists and items.

### Services and Controllers

- **Services:** Retrieve information from the database.
- **Controllers:** Utilize data from services to perform actions based on client
  requests.

### Endpoints

- **Homepage (`"/"`):** Displays shopping list statistics.
- **List Page (`"/lists"`):** Shows created lists, with options to add and
  deactivate them.
- **Individual List Page (`"/lists/{id}"`):** Lists items within a specific
  list, with options to add items and mark them as completed.

### Testing

- **E2E Playwright:** Located in the `e2e-playwright` folder, these are
  end-to-end tests for the application.

## Starting and Stopping the Application

### Using Docker Compose

- **Starting:** Open the terminal in the folder containing `docker-compose.yml`
  and type `docker-compose up`.
- **Stopping:** Press `ctrl+C` in the same terminal or use `docker-compose stop`
  from a new terminal in the same directory.

### Watching for Changes

- The application automatically watches for changes and restarts as necessary.
  Note that there may be issues with this feature in Windows Subsystem for Linux
  (WSL).

## Database Management

### Accessing the Database

- Run `docker exec -it database-server psql -U username database` to access the
  PostgreSQL database via terminal.

### Database Migrations

- Flyway manages database migrations located in the `flyway/sql` folder.
  Modifications to the database schema should be made through new migration
  files.

### Cleaning Up the Database

- To reset the database, use `docker-compose down`. This removes existing tables
  and recreates the database based on migration files.

## Additional Configurations

### Deno Cache

- Dependencies are stored in the `app-cache` folder. Clear the cache by emptying
  this folder.

### Project.env File

- Contains configurations for the database and Deno cache. For deployment,
  create a new `project.env` file specific to the deployment environment.

### VSCode Settings

- Default settings are provided in the `.vscode/settings.json` file, assuming
  the use of the VSCode Deno plugin.

## End-to-End Testing with Playwright

- Run E2E tests using
  `docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf`.
- These tests launch a browser in Docker and programmatically test the
  application.
