# Budget

## Development environment

APIDOC generated documentation available at ./apidoc folder.

### Installation

Create database:
```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database smarketing_budget owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```

Place in /opt/environment.sh:
```sh
export SM_ENV=dev
```

Install dependencies:
```sh
yarn install

```

Build application:
```sh
yarn build
```

Run migrations:
```sh
chmod +x bin/environment
yarn migrate
mkdir runtime/
```

Generate documentation:
```sh
yarn apidoc
```


### Start application

In one console run typescript compiler in watch mode:
```sh
yarn build-dev
```

In another console run nodemon watching compiled files changes:
```sh
yarn start-dev
```
or `yarn start` without watch.

See logs in `runtime` folder.


## Shared development, QA environment

### Before jenkins deployment

Create database:
```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database smarketing_budget owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```

Place in /opt/environment.sh:
```sh
export SM_ENV=dev
```
