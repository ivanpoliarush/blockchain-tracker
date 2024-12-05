This project is built with NestJS and NextJS using a PostgreSQL database. The idea of the project is to track transactions from a specific wallet and display all these transactions. All steps to launch the project are described below

To run the application:

    git clone https://github.com/ivanpoliarush/blockchain-tracker.git

    cd blockchain-tracker

    add ".env" files(you can use .env.example)

    docker-compose up -d

    pnpm install

    pnpm build

    cd apps/api && pnpx prisma migrate deploy && pnpx prisma migrate dev && cd ../..

    pnpm dev
