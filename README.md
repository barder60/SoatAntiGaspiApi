# soat-anti-gaspi-node

Ce référentiel contient le code de l'API Antigaspi de Soat en NodeJs.

## Prérequis

### Editeur

Un éditeur de code permet de travailler plus aisément sur la solution. je recommande personnellement [VsCode](https://code.visualstudio.com/) mais vous êtes libres de choisir le vôtre.

### Node

[Node](https://nodejs.org/) en version 16+ est nécessaire

### Docker Desktop

Il est nécessaire d'avoir installé [Docker Desktop](https://www.docker.com/products/docker-desktop/) sur votre environnement afin d'utiliser les images pour la base de données et l'API.

## Comment démarrer ?

Vous pouvez exécuter la commande suivante pour récupérer le code
`git clone https://github.com/lpichet/soat-anti-gaspi-node.git`

Vous pouve ensuite lancer la commande suivante afin de démarrer les images Docker
`docker compose up --build`

## Architecture de l'API

L'API est écrite en [Typescript](https://www.typescriptlang.org/), cependant vous pouvez repasser en javascript en modifiant les extensions de fichier `.ts` en `.js`.

### Types

Le dossier `types` comprend la liste des définitions de types utilisés dans l'API.

### Db

Le dossier `db`comprend un helper qui initialise un pool de connexions vers la base de données. Il ne doit être instancié qu'une seule fois !
La connexion à la base se fait grâce à des variables d'environnement situées dans le dossier `.env`

- PGUSER
- PGHOST
- PGPASSWORD
- PGDATABASE
- PGPORT

### Dockerfile

Le fichier `Dockerfile` décrit la procédure permettant de monter l'image de notre API. Celle-ci récupère les sources, compile l'application et la lance sur le port défini

### Docker-compose.yml

Le fichier `docker-compose.yml` permet de configurer les deux services à exécuter simultanément : la base de données et l'API.
C'est lui qui paramètre l'image de la base de données Postgresql et qui lui fournit un script d'initalisation.
Il exécute ensuite l'image de l'API en la liant à l'image de postgresql

## Base de données

Le schéma de la base de données est `antigaspi`

### Offers

| Nom          | Type        | Contrainte(s) |
| ------------ | ----------- | ------------- |
| Id           | uuid        | PRIMARY KEY   |
| Title        | text        | NOT NULL      |
| Description  | text        | NOT NULL      |
| Email        | text        | NOT NULL      |
| CompanyName  | text        | NOT NULL      |
| Address      | text        | NOT NULL      |
| Availability | timestamptz |               |
| Expiration   | timestamptz |               |
| Status       | integer     | NOT NULL      |
