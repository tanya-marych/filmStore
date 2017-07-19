# Film store

Для запуска приложения сначала нужно запустить сервер(localhost:8080) 
```sh
$ babel-node server/app.js
```
и параллельно webpack-dev-server(localhost:3000)
```sh
$ npm run start
```

Чтобы запустить тесты:
```sh
$ npm test
```

# Архитектура приложения

В проекте есть 5 папок, каждая из которых отвечает за определенный функционал.
| папка | содержание |
| ------ | ------ |
| client |компоненты React, а также папки для архитектуры Flux(reducers,store,actions),api для отправки данных на сервер|
| server |соединение с бд и обработка запросов(REST API) |
| test | простые тесты reducers,actions и компоненты ImportFile |
| public | папка build, куда бандлятся css и js |
| etc |файл конфигурации (порт, бд)  |
