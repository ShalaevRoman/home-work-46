# Claude Code Guidelines for This Project

## Git Commit Conventions

### ❌ NEVER Do This
- **Never add Claude attribution** to commits (no `Co-Authored-By: Claude`)
- Never use generic messages like "update code" or "make changes"
- Never write long, paragraph-style commit messages

### ✅ Always Do This
- Use **Conventional Commits** format:
  - `feat:` - New feature
  - `fix:` - Bug fix
  - `docs:` - Documentation changes
  - `refactor:` - Code refactoring
  - `test:` - Test additions or changes
  - `style:` - Formatting, missing semicolons, etc.
  - `chore:` - Dependency updates, build changes

### Examples
```bash
# Good
git commit -m "feat: add favorites functionality with localStorage"
git commit -m "fix: correct GitHub Pages URL in README"
git commit -m "docs: update installation instructions"

# Bad
git commit -m "Update code - Claude"
git commit -m "Co-Authored-By: Claude <noreply@anthropic.com>"
git commit -m "Make some changes"
```

## Workflow: Дроблення задач і поетапні коміти

### ✅ Завжди роби так
- **Дроби велику задачу на малі кроки** — не виконуй домашку одним суцільним блоком
- Після виконання **кожної малої задачі**:
  1. Зупинись і дай користувачу перевірити результат (в браузері/консолі)
  2. **Не роби коміт і не пуш, поки користувач явно не підтвердив**, що все ок (наприклад "ок", "гуд", "коміть")
  3. Тільки після підтвердження — зроби `git commit` (за Conventional Commits) і `git push` для цього кроку
  4. Переходь до наступної малої задачі
- Мета — щоб в історії коммітів було видно **як відбувалась розробка** крок за кроком, а не один великий коміт "зробив домашку"

### ❌ Не роби так
- Не виконуй всю домашню роботу одразу і не роби один фінальний коміт в кінці
- Не роби коміт/пуш без явного підтвердження користувача після кожного кроку

## Code Style

- Use meaningful variable names
- Keep functions focused and modular
- Add comments only when "WHY" is non-obvious
- No over-engineering for hypothetical future needs

## Testing

- Test UI changes in browser before marking complete
- Don't rely only on tests - verify user-facing features work
- Check for regressions in existing features

## TypeScript & Type Safety

### ✅ Always Do This
- **Use TypeScript везде** — не допускаються .js файли в src/
- **Повна типізація** — кожна змінна, функція, пропс має тип
- **Винесення типів в окремі файли**:
  - `src/types/` — для типів та інтерфейсів
  - `src/types/api.ts` — типи для API
  - `src/types/models.ts` — моделі даних
  - `src/types/components.ts` — пропси компонентів
- **Не допускаються `any` типи** — використовуй `unknown` якщо потрібно
- Інтерфейси для об'єктів, типи для примітивів

### Приклад структури типів
```typescript
// src/types/models.ts
export interface Message {
  id: string
  text: string
  timestamp: Date
}

// src/types/components.ts
export interface MessageComponentProps {
  data: Promise<Message>
}
```

## API & Server Communication

### ✅ Best Practices
- **Весь код для звернення до сервера в `src/api/`**:
  - `src/api/client.ts` — axios/fetch інстанс
  - `src/api/messages.ts` — функції для Messages
  - `src/api/users.ts` — функції для Users
- **Кожна функція має повний тип**:
  ```typescript
  export async function getMessages(): Promise<Message[]> { ... }
  ```
- **Обробка помилок** — в API функціях, не в компонентах
- **Константи** — в `src/constants/`

## React Components Architecture

### ✅ Structure
```
src/
├── types/              # Типи і інтерфейси
│   ├── api.ts
│   ├── models.ts
│   ├── components.ts
├── api/                # Серверні запити
│   ├── client.ts
│   └── messages.ts
├── constants/          # Константи
│   └── config.ts
├── components/         # Компоненти
│   ├── MessageComponent.tsx
│   ├── ErrorBoundary.tsx
│   └── index.ts        # Експорти
├── hooks/              # Кастомні хуки
│   └── useMessages.ts
└── App.tsx
```

### ✅ Component Best Practices
- **Функціональні компоненти тільки** — класові компоненти застарілі
- **Розділення на контейнери та презентаційні компоненти**:
  - Контейнер: логіка, стан, API запити
  - Презентаційний: тільки отримує пропси і рендерить
- **Один компонент = один файл** (крім малих утилітних компонентів)
- **Пропси завжди типізовані** через інтерфейси

### Приклад правильного компонента
```typescript
// src/components/MessageComponent.tsx
import { FC } from 'react'
import { MessageComponentProps } from '../types/components'

export const MessageComponent: FC<MessageComponentProps> = ({ data }) => {
  // компонент
}
```

## File Organization

- Prefer editing existing files over creating new ones
- Keep sensitive data (API keys, credentials) in `.gitignore`
- Maintain clean git history
- **Усі файли іменувати в camelCase або kebab-case** (залежно від типу)
- **Компоненти в PascalCase: MessageComponent.tsx**
- **Функції в camelCase: fetchMessages.ts**

---

## Vercel Deployment

### Як деплоїти на Vercel

1. **Встановити Vercel CLI** (якщо не встановлено):
   ```bash
   npm install -g vercel
   ```

2. **Залогінитись:**
   ```bash
   vercel login
   ```

3. **Задеплоїти на production:**
   ```bash
   vercel --prod --yes
   ```
   Vercel автоматично підхопить Vite проект, збере і задеплоїть.

4. **Після деплою** Vercel дає два URL:
   - Унікальний (типу `home-work-40-xxx.vercel.app`)
   - Аліас (типу `home-work-40-tau.vercel.app`) — **це і є production URL**

### ✅ Фінальний крок кожної домашки

В кінці кожної домашки надати два посилання у форматі:

```
Демо: https://home-work-XX-tau.vercel.app
GitHub: https://github.com/ShalaevRoman/home-work-XX
```

І додати їх в README.md у секцію "Посилання на проект".

---

**Note for future projects:** Copy this file to new projects to maintain consistent guidelines across all homework assignments.