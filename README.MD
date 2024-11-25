# Getting started


## Requirements:
    -   docker
    -   npx
    -   yarn

## Backend using NESTJS

go to the backend folder

Copy the `.env-example ` file to a `.env` file so you'll have all your env variables set

run `yarn` to install dependencies

after installing dependencies, you should get your db ready:

run `yarn db:up`

when the db is ready, you can set it up, migrating the tables and seeding the db

run `yarn db:seed`

Now everything is setup, you can simply run the backend:

run `yarn start:dev`

## Frontend using NEXTJS

go to the frontend folder

Copy the `.env-example ` file to a `.env-local` file so you'll have all your env variables set

run `yarn` to install dependencies

after that you're all set to run the frontend:

run `yarn start:dev`
