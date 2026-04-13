# 📦 checklist-RTK-Query.md

## 🚀 1. Базовая настройка RTK Query

* [x] Установлен `@reduxjs/toolkit`
* [x] Создан `baseApi` через `createApi`
* [x] Настроен `fetchBaseQuery`
* [x] Добавлен `reducer`:

  * `[baseApi.reducerPath]: baseApi.reducer`
* [x] Подключен `middleware`:

  * `baseApi.middleware`
* [x] Обернули приложение в `Provider`

---

## 🧠 2. createApi = аналог createSlice

* [x] `createApi` создаёт:

  * reducer
  * middleware
  * endpoints
  * auto-generated hooks

---

## 🔗 3. Эндпоинты

* [x] Создан `getPosts` (query)
* [x] Создан `deletePost` (mutation)
* [x] Создан `createPost` (mutation)
* [x] Экспорт хуков:

  * `useGetPostsQuery`
  * `useDeletePostMutation`
  * `useCreatePostMutation`

---

## 🔄 4. Query vs Mutation

* [x] `query` → получение данных
* [x] `mutation` → изменение данных
* [x] хуки:

  * `useXQuery`
  * `useXMutation`

---

## 📦 5. Работа с данными в компонентах

* [x] Использование:

```ts
const { data, isLoading, isError } = useGetPostsQuery()
```

* [x] Обработка состояний:

  * loading
  * error
  * success

---

## 🧱 6. FSD структура

* [x] `entities/post`

  * api
  * model
  * ui
* [x] `features`

  * create-post
  * delete-post
  * search-post
  * pagination
* [x] `pages`

  * PostPage

---

## 🔍 7. Поиск (search)

* [x] Добавлен `SearchInput`
* [x] Добавлен `usePostSearch`
* [x] Добавлен debounce
* [x] Перенос поиска в API (query params)

---

## ⚡ 8. Debounce

* [x] Реализован `useDebounce`
* [x] Уменьшены лишние запросы
* [x] Используется перед вызовом query

---

## 🌐 9. Query params

* [x] Добавлены параметры:

```ts
params: {
  q: search
}
```

* [x] Серверный фильтр вместо клиентского

---

## 📄 10. Пагинация (page + search)

* [x] Query принимает:

```ts
{ search: string; page: number }
```

* [x] Используются:

```ts
_page
_limit
```

---

## 🧠 11. Ключевая концепция RTK Query

* [x] Cache key = аргумент query

```ts
useGetPostsQuery({ search, page })
```

* [x] Каждый аргумент → отдельный кеш

---

## 🔄 12. URL синхронизация

* [x] Используется `useSearchParams`
* [x] Синхронизация:

  * search
  * page
* [x] Обновление URL при изменении

---

## 🔁 13. Сброс страницы при поиске

* [x] При изменении search:

```ts
setPage(1)
```

---

## 🧠 14. Кастомный cache registry

* [x] Создан `searchCache`
* [x] Хранит:

```ts
{ search, page }
```

* [x] Используется `Set + JSON.stringify`

---

## ⚡ 15. Optimistic updates

### deletePost

* [x] Используется `onQueryStarted`
* [x] `updateQueryData`
* [x] rollback через `undo()`

---

### createPost

* [x] Оптимистическое добавление
* [x] временный `id`
* [x] rollback при ошибке

---

## 🔥 16. Multi-cache обновление

* [x] Обновляются ВСЕ кеши:

```ts
getSearchKeys().map(...)
```

---

## 🧠 17. ВАЖНО

* [x] `updateQueryData` требует ТОЧНЫЙ аргумент:

```ts
{ search, page }
```

---

## 🏷️ 18. Tags (providesTags)

* [x] Используются:

```ts
LIST-${search}-${page}
```

* [x] Привязка к cache key

---

## ⚠️ 19. invalidateTags vs manual cache

* [x] Выбран подход:

  * manual cache (updateQueryData)
* [x] Избегаем лишних refetch

---

## 🎨 20. UI архитектура

* [x] Разделение на зоны:

  * header
  * controls
  * content
  * pagination

---

## 🧱 21. UI primitives

### Row

* [x] Поддержка:

  * justify
  * align
  * gap

---

## 📦 22. Pagination (feature)

* [x] Вынесен в `features/pagination`
* [x] Есть:

  * model (usePagination)
  * ui (Pagination)

---

## 🧠 23. Разделение ответственности

* [x] Page:

  * хранит state
  * управляет URL
* [x] Feature:

  * управляет поведением
  * не хранит state страницы

---

## ⚠️ 24. Антипаттерны (избегаем)

* [x] Хранение page внутри feature
* [x] Использование string вместо object key
* [x] Несинхронизированные аргументы query
* [x] Одновременный invalidateTags + manual cache

---

## 🔧 25. Инфраструктура

* [x] Настроены алиасы
* [x] Решена проблема с TypeScript (`ignoreDeprecations`)
* [x] Проект билдится

---

# 🧠 Итог

✔ RTK Query на уровне production
✔ Понимание cache архитектуры
✔ Работа с optimistic updates
✔ FSD + UI + API связка
✔ Pagination + Search + URL

---

# 🚀 Дальше

* [ ] total pages (disable Next)
* [ ] prefetch next page
* [ ] infinite scroll
* [ ] error boundaries
* [ ] skeleton loaders

---
