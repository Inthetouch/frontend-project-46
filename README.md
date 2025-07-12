# Проект Вычислитель отличий
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

## Установка

Установить зависимости можно командой ```make install``` или ```npm install```.

## Возможности утилиты
- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

### Пример использования:
Для вывода справки необходимо ввести ```gendiff --help или gendiff -h```  
Пример запуска [здесь](https://asciinema.org/a/EEviugVbD9FQx8EPUXHccganh)

### Демонстрация работы программы и примеры сравнения в разных стилях:
[Ссылка](https://asciinema.org/a/tWfqBXfBjyx6z8bEmfXrdNT3D)

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Inthetouch/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Inthetouch/frontend-project-46/actions)
### SonarQube status:
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Inthetouch_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Inthetouch_frontend-project-46)