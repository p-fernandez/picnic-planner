# picnic-planner

## Requeriments

This project needs to be run alongside a MongoDB instance.
If you don't want to run or launch your own MongoDB instance it is included a script to use [`docker-compose`](https://docs.docker.com/engine/reference/commandline/compose_up/) to download and build a Docker instance of MongoDB. But before hand you would need to install in your machine [`docker-compose`](https://docs.docker.com/compose/install/).

You simply need to execute:
```zsh
pnpm local:start:mongo-db
```

## Run locally

These instructions refer to use `pnpm` as the package manager but other options can be used.

1. Get inside of the folder where the code is located
```zsh
cd picnic-planner
```

2. Install the project
```zsh
pnpm install
```

3. Build the project
```zsh
pnpm build
```

4. Run the project
```zsh
pnpm start
```

## Developing locally
These instructions refer to use `pnpm` as the package manager but other options can be used.

1. Get inside of the folder where the code is located
```zsh
cd picnic-planner
```

2. Install the project
```zsh
pnpm install
```

3. Build the project
```zsh
pnpm build
```

4. Run the project in watch mode. This mode will make the server to hot reload the changes done to the code
```zsh
pnpm start:dev
```
