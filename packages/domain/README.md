# Domain Package

This package contains core domain types and interfaces for the Camplight Task application.

## Exports

- `Country`: Interface representing country data
- `CountryNote`: Interface for country notes
- `CountriesState`: Interface for application state
- `Region`: Type for geographic regions

## Usage

```typescript
import { Country, CountriesState } from '@camplight-task/domain';

const country: Country = { /* ... */ };
const state: CountriesState = { /* ... */ };
```

## Types

### Country
Represents country data including:
- Basic info (name, flag)
- Region
- Capital
- Population
- Languages
- Currencies

### CountriesState
Tracks application state including:
- Countries list
- Loading/error states
- Search/filter state
- Favorites
- Notes

### CountryNote
Represents user notes for countries

### Region
Type for geographic regions (Africa, Americas, Asia, Europe, Oceania)
