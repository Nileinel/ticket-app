# Ticket Management App - MEAN Stack Demo

A demo application for viewing, creating, editing and deleting tickets, built with the MEAN stack (MongoDB, Express.js, Angular, Node.js).

<img width="1265" height="647" alt="Image" src="https://github.com/user-attachments/assets/c4541e3b-c4b4-4ccf-8f44-03f2b0374922" />

## Features

- Create, view, update, and delete tickets

## Tech Stack

- **Frontend:** Angular
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Indexing & Analytics**: Elasticsearch synced to MongoDB w/ Monstache  + Kibana dashboard

## Getting Started

### Prerequisites

- Node.js & npm & Angular CLI 
- Docker: docker-compose

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ticket-app.git
    cd ticket-app
    ```

2. Install backend dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

### Running the App

1. Start backend services w/ Docker (from project root directory):
    ```bash
    docker-compose up -d
    ```

2. Start the Angular frontend:
    ```bash
    cd ../client
    ng serve -o
    ```

4. Visit `http://localhost:4200` in your browser.

## Folder Structure

```
ticket-app/
  server/
  client/
  docker/
  README.md
  docker-compose.yml
```
## Acknowledgements

### Known Vulnerabilities and Possible Improvements

1. Monstache authenticated for Elasticsearch using the elastic user (superuser) for ease: Should create a dedicated user with appropriate permissions for Monstache.
2. Dockerise frontend for easier deployment.
3. Add authentication for MongoDB.
4. Serve frontend via SSL certificates for HTTPS.

