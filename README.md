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
### What I found easy 
It was fairly straightforward to pick up Angular and build a quick, responsive and aesthetically pleasing frontend. Learning it as I went was a fun challenge, and I was happy with the outcome. 

Using Mongoose was also easy -- it is very well documented and I was able to figure out how to make API calls to MongoDB with it without difficulty. 

Overall, I found MongoDB's official tutorials and documentation on the MEAN stack most helpful while developing the app.

I also took some time to automate running the backend on Docker as best as I can, using scripts and docker-compose, to make setup seamless.

### Challenges
I struggled syncing the MongoDB database used by the app to Elasticsearch manually. My research revealed a selection of plugins (for Elasticsearch) or river implementations that stream data from MongoDB to Elasticsearch. Because I couldn't get this integration working manually, I opted to use [Monstache](https://rwynn.github.io/monstache-site/), a sync daemon that continuously indexes MongoDB into Elasticsearch, as it enables real-time syncing, runs on the same Docker container as the Elasticsearch-Kibana-MongoDB stack, and was easy to configure. This way, I was able to get Elasticsearch synced to MongoDB and also have Kibana showing real-time updates on my data for the indexing and search capabilities. 

### Known Vulnerabilities and Possible Improvements

1. Monstache authenticated for Elasticsearch using the elastic user (superuser) for ease: Should create a dedicated user with appropriate permissions for Monstache.
2. Latency introduced by Monstache daemon: it may take some time for changes on MongoDB to reflect on Elasticsearch + Kibana (especially in larger scale). Potential for better / more scalable solutions. 
3.  Dockerise frontend for easier deployment.
4. Add authentication for MongoDB.
5. Serve frontend via SSL certificates for HTTPS.

