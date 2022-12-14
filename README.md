<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running in Development Mode (Yarn)

1. Get the repo

```bash
$ git clone git@github.com:cariddi/Nest-Pokemon.git
```

2. Install dependencies

```bash
$ yarn install
```

3. Install Nest (globally)

```bash
$ npm i -g @nestjs/cli
```

4. Pull Mongo Image (Docker)

```bash
$  docker pull mongo
```

5. Start Docker Container (DB)

```bash
$  docker-compose up -d
```

6. Clone file **.env.template** and rename it to **.env**

7. Fill the env variables defined in **.env**

8. Start the App

```bash
$  yarn start:dev
```

9. Run the SEED request to populate tables

```bash
$  localhost:3000/api/v2/seed
```

## Starting Modes

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tech Stack

- MongoDB
- Nest

# Production Build

1. Create file `.env.prod file`
2. Fill enviroment variables for prod
3. Create new image:

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
