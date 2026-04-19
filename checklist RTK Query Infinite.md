# checklist-RTK-Query-Infinite.md

## 1. Базовая настройка RTK Query

* [x] Создан `baseApi`
* [x] Подключен `QueryClientProvider` / store
* [x] Инжектированы endpoints через `injectEndpoints`

---

## 2. Query с параметрами (search + page)

* [x] Используем query аргументы:

```ts
getPosts: build.query<PostResponse, { search: string; page: number }>
```

* [x] Передаём параметры:

```ts
params: {
  q: search || undefined,
  _page: page,
  _limit: 10,
}
```

---

## 3. transformResponse (pagination meta)

* [x] Достаём `x-total-count` из headers

```ts
transformResponse: (response, meta) => ({
  data: response,
  total: Number(meta?.response?.headers.get('x-total-count') ?? 0),
})
```

---

## 4. Кеширование search + page

* [x] Храним ключи запросов (search + page)
* [x] Используем их для обновления кеша (delete/update)

---

## 5. Optimistic updates

### deletePost

* [x] Обновляем ВСЕ кеши через `updateQueryData`
* [x] Делаем rollback через `patch.undo()`

---

## 6. URL = единственный источник правды

* [x] Используем `useSearchParams`
* [x] Храним:

```txt
?q=search&page=1
```

* [x] Управляем:

```ts
setParams()
```

---

## 7. Debounce + синхронизация

* [x] input → debounced → URL
* [x] URL → input

```ts
useEffect(() => {
  if (current !== debounced) setParams(...)
}, [debounced])

useEffect(() => {
  if (input !== search) setInput(search)
}, [search])
```

---

## 8. Prefetch (следующая страница)

* [x] Используем:

```ts
dispatch(postApi.util.prefetch(...))
```

* [x] Триггер:

```ts
useEffect → при изменении page
```

---

## 9. Infinite Scroll (feature слой)

📁 `features/pagination/model/useInfinitePosts.ts`

* [x] Локальный state:

```ts
page, items, total
```

* [x] Append логика:

```ts
page === 1 → replace
else → append
```

---

## 10. Race condition fix

* [x] Используем `useRef`:

```ts
requestRef.current = search
```

* [x] Проверяем актуальность:

```ts
if (requestRef.current !== search) return
```

---

## 11. Защита от дублей

```ts
const existingIds = new Set(prev.map(p => p.id))
```

---

## 12. Prefetch внутри hook (правильное место)

* [x] Перенесли prefetch в `useInfinitePosts`

```ts
if (items.length < total) {
  prefetch(nextPage)
}
```

---

## 13. Reset при смене search

```ts
useEffect(() => {
  setPage(1)
  setItems([])
  setTotal(0)
}, [search])
```

---

## 14. Skeleton UI (shared/ui)

📁 `shared/ui/Skeleton`

* [x] Создан универсальный компонент
* [x] Добавлен shimmer эффект (CSS)

```css
.skeleton::after {
  animation: shimmer
}
```

---

## 15. PostSkeleton (entity уровень)

📁 `entities/post/ui`

* [x] `PostSkeleton`
* [x] `PostSkeletonList`

---

## 16. UX состояния

* [x] First load → SkeletonList
* [x] Load more → skeleton снизу
* [x] isLoading vs isFetching разделены

---

## 17. Infinite UX (как Notion / GitHub)

* [x] Load more вместо pagination
* [x] Автодогрузка
* [x] Prefetch следующей страницы

---

## 18. Virtualization (react-window)

📁 `features/virtualization/ui/VirtualizedPostList.tsx`

---

### Используем v1 API:

```ts
import { FixedSizeList as List } from 'react-window'
```

---

### Реализация:

```ts
<List
  height={600}
  itemCount={posts.length}
  itemSize={120}
  itemData={posts}
>
  {Row}
</List>
```

---

### Row компонент:

```ts
const Row = ({ index, style, data }) => {
  const post = data[index]
  return (
    <div style={style}>
      <PostCard post={post} />
    </div>
  )
}
```

---

## 19. Важные правила virtualization

* [x] ❗ НЕ использовать `.map()`
* [x] ❗ itemSize = реальная высота
* [x] ❗ не использовать margin (лучше padding)
* [x] ❗ data передаётся через `itemData`

---

## 20. Архитектура (FSD)

```txt
entities/
  post/
    ui/
      PostCard
      PostSkeleton

features/
  pagination/
    model/useInfinitePosts

  virtualization/
    ui/VirtualizedPostList

shared/
  ui/Skeleton
```

---

## 🧠 Итоговый уровень

```txt
✔ RTK Query (production)
✔ infinite scroll
✔ prefetch
✔ race condition safe
✔ skeleton UX
✔ virtualization
```

---

## 🚀 Дальше (опционально)

* [ ] Variable height virtualization
* [ ] react-virtual (современная альтернатива)
* [ ] Scroll position restore
* [ ] Empty state / Error UI
* [ ] IntersectionObserver вместо кнопки

```
```

