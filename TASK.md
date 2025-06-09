# ⭐ Test Task – **Country Explorer**

# Objective

Create a small React 18 + TypeScript application that lets people explore world countries, mark favourites, and jot personal notes. 

⚠️ The emphasis is on clean component design, custom hooks, state management, and test coverage—not on pixel-perfect visuals.

**Time-box:** roughly **4 hours**. When time’s up, push what you have and note next steps in the README.

---

## 1 · Core Features

| # | Feature | Details |
| --- | --- | --- |
| 1 | **Browse** | Fetch from `https://restcountries.com/v3.1/all`; show flag thumbnail, country name, and region. Paginate or infinite-scroll 20 items at a time. |
| 2 | **Search & Filter** | Case-insensitive search by name + region dropdown (Africa, Americas, Asia, Europe, Oceania). |
| 3 | **Details Panel** | Modal or side-panel with large flag, capital, population, languages, and currencies. |
| 4 | **Favourites & Notes** | Star/un-star countries and write a short note per favourite (stored in component state for the core scope). |
| 5 | **Error Handling** | On any fetch failure, show a dismissible banner with a **Retry** button. |

---

## 2 · Quality Baseline (must-haves)

- **Type Safety** – React 18 with TypeScript.
- **Data Layer** – Reusable `useCountries` (or similar) custom hook for all fetch & cache logic.
- **Lint & Format** – ESLint + Prettier (or Biome); configs committed.
- **Tests** – ≥ 3 unit tests for the hook **and** ≥ 2 component tests (Jest + React Testing Library).
- **Performance** – Lazy-load the Details panel with `React.lazy`; avoid unnecessary re-renders during search/filter.

---

## 3 · Stretch Goals (pick **≤ 2**)

1. **Local-Storage Sync** – Persist favourites and notes so they survive page reloads.
2. **Simple End-to-End Test** – Cypress or Playwright flow covering “star country → add note → reload (if using localStorage) → confirm persistence”.
3. **LLM Fun-Fact Call** – Fetch a one-sentence “fun fact” about a selected country using an LLM API (e.g., OpenAI) and display it in the Details panel.

---

## 4 · Deliverables

1. **Roadmap e-mail before coding** – send us your solution architecture plans and any open questions. 
2. **GitHub mono-repository** containing the app.
3. **README** explaining architecture, trade-offs vs. the 4 h limit, and how to run the app and test it.

> Please submit a link to a GitHub MONOrepository when you feel ready
>