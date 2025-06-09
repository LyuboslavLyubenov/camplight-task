import { useState, useEffect, useMemo, useCallback } from 'react';
import { Country, CountriesState } from '@camplight-task/domain';

const ITEMS_PER_PAGE = 20;

export const useCountries = () => {
  const [state, setState] = useState<CountriesState>({
    countries: [],
    loading: true,
    error: null,
    searchTerm: '',
    selectedRegion: 'all',
    favorites: new Set(),
    notes: {},
  });

  const [currentPage, setCurrentPage] = useState(1);

  const regions = useMemo(() => {
    const uniqueRegions = new Set<string>(['all']);
    state.countries.forEach(country => uniqueRegions.add(country.region));
    return Array.from(uniqueRegions);
  }, [state.countries]);

  const loadCountries = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch('/countries');
      if (!response.ok) throw new Error('Failed to fetch countries');
      const countries = await response.json();
      setState(prev => ({
        ...prev,
        countries: countries.sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common)),
        loading: false,
        error: null,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch countries'
      }));
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const filteredCountries = useMemo(() => {
    return state.countries.filter(country => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase());
      
      const matchesRegion = state.selectedRegion === 'all' || 
        country.region === state.selectedRegion;
      
      return matchesSearch && matchesRegion;
    });
  }, [state.countries, state.searchTerm, state.selectedRegion]);

  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCountries.slice(0, startIndex + ITEMS_PER_PAGE);
  }, [filteredCountries, currentPage]);

  const hasMore = useMemo(() => {
    return paginatedCountries.length < filteredCountries.length;
  }, [paginatedCountries.length, filteredCountries.length]);

  const setSearchTerm = useCallback((term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
    setCurrentPage(1);
  }, []);

  const setSelectedRegion = useCallback((region: string) => {
    setState(prev => ({ ...prev, selectedRegion: region }));
    setCurrentPage(1);
  }, []);

  const toggleFavorite = useCallback((countryCode: string) => {
    setState(prev => {
      const newFavorites = new Set(prev.favorites);
      const newNotes = { ...prev.notes };
      
      if (newFavorites.has(countryCode)) {
        newFavorites.delete(countryCode);
        delete newNotes[countryCode];
      } else {
        newFavorites.add(countryCode);
      }
      
      return {
        ...prev,
        favorites: newFavorites,
        notes: newNotes,
      };
    });
  }, []);

  const updateNote = useCallback((countryCode: string, note: string) => {
    setState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [countryCode]: note,
      },
    }));
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore && !state.loading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, state.loading]);

  const retryFetch = useCallback(() => {
    loadCountries();
  }, [loadCountries]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    countries: paginatedCountries,
    allCountries: state.countries,
    loading: state.loading,
    error: state.error,
    searchTerm: state.searchTerm,
    selectedRegion: state.selectedRegion,
    favorites: state.favorites,
    notes: state.notes,
    hasMore,
    totalFiltered: filteredCountries.length,
    regions,
    setSearchTerm,
    setSelectedRegion,
    toggleFavorite,
    updateNote,
    loadMore,
    retryFetch,
    clearError,
  };
};
