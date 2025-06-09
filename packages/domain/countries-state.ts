import { Country } from './country';

export interface CountriesState {
    countries: Country[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    selectedRegion: string;
    favorites: Set<string>;
    notes: Record<string, string>;
  }