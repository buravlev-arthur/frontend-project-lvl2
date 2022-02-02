[![Actions Status](https://github.com/buravlev-arthur/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/buravlev-arthur/frontend-project-lvl2/actions)
[![example workflow](https://github.com/buravlev-arthur/frontend-project-lvl2/actions/workflows/linting-and-testing.yml/badge.svg)](https://github.com/buravlev-arthur/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/8e2a092962656c7a24af/maintainability)](https://codeclimate.com/github/buravlev-arthur/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8e2a092962656c7a24af/test_coverage)](https://codeclimate.com/github/buravlev-arthur/frontend-project-lvl2/test_coverage)

### Описание
"Вычислитель отличий" сравнивает объекты и возвращает обнаруженные в них изменения. Программа работает в нескольких режимах, поддерживает два формата файлов и несколько форматов вывода результата сраванения.

#### Режимы работы
- cli-утилита
- js-библиотека

#### Поддерживаемые форматы файлов
- json
- yaml/yml

#### Форматы вывода результата сравнения
- stylish
- plain
- json

### Установка и запуск cli-утилиты
1. Склонируйте репозиторий и, находясь в каталоге локального репозитория, установите все зависимости: 
```
make install
```
2. Добавьте исполняемые файлы программы в окружение Linux:
```
npm link
```
3. Запустите программу, передав ей два файла для сравнения и указав формат вывода результата (последний можно опустить):
```
gendiff file1.json file2.yml -f plain
```
4. Получите дополнительную справку:
```
gendiff -h
```

### Установка и запуск js-библиотеки
1. Склонируйте репозиторий и, находясь в каталоге локального репозитория, установите все зависимости:
```
make install
```
2. Импортируйте библиотеку в свой проект:
```
import genDiff from '@hexlet/code';
```
3. Используйте функцию:
```
const diff = genDiff(filepath1, filepath2, format);
```
   Параметры функции:
   - **filepath1**, **filepath2** - абсолютные или относительные пути к сравневаемым файлам;
   - \[**format**\] - формат возвращаемого результата сравнения. Может принимать значения: "stylish", "plain", "json". Необязательный параметр, по умолчанию - "stylish".

### Демострация работы утилиты
#### Сравнение плоских JSON-файлов
[![asciicast](https://asciinema.org/a/mSrXOHggIjdGAQGX9rW4U3Lf4.svg)](https://asciinema.org/a/mSrXOHggIjdGAQGX9rW4U3Lf4)

#### Сравнение плоских YAML-файлов
[![asciicast](https://asciinema.org/a/yGxOqFate52Ur8dzdqFTSlS9j.svg)](https://asciinema.org/a/yGxOqFate52Ur8dzdqFTSlS9j)

#### Глубокое сравнение файлов
[![asciicast](https://asciinema.org/a/Uyu0AhyTESYr0w3uz2lB9VFQb.svg)](https://asciinema.org/a/Uyu0AhyTESYr0w3uz2lB9VFQb)

#### Вывод сраванения в формете "plain"
[![asciicast](https://asciinema.org/a/1DvLtQurwtJusIIVdUBqWk6Mr.svg)](https://asciinema.org/a/1DvLtQurwtJusIIVdUBqWk6Mr)
#### Вывод стравнения в формате "JSON"
[![asciicast](https://asciinema.org/a/grrkfdIMNIoOsKKcYWxKuzGx1.svg)](https://asciinema.org/a/grrkfdIMNIoOsKKcYWxKuzGx1)