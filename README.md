## 📋 Challenge Surflex Front-end

Este projeto é um sistema que exibe a listagem de personagens da API do "Rick And Morty" além de registrar/logar um usuário e após autenticador permite o usuário criar uma lista com os seus personagens favoritos.

## O que foi utilizado no projeto:

- Typescript
- Express
- Postgress
- Prisma
- Nodejs
- Jest

### Regras de negócio:

### Link do repositório Client (Front-end)

🔗 [Front-end](https://github.com/jrsousadev/challenge-surflex-front)

### Deploy

🔗 [Conhecer aplicação](https://challenge-surflex-front.herokuapp.com/)

### Iniciando o Projeto

**1-** Clone repository.

**2-** Install dependecies.
```js
yarn
// or
yarn install

# copy .env file
> cp .env.example .env

# start project
> yarn dev

# open in
> http://localhost:3000
```


### Generating the migration
```sh
> yarn prisma migration dev
```

### Create events manually
```sh
> yarn seed
```

