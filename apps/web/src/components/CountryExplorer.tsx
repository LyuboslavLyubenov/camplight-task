
import { useState } from 'react';
import { Country } from '@camplight-task/domain';
import { useCountries } from '../hooks/useCountries';
import { Button, ErrorBanner, LoadingGrid, SearchAndFilter } from '@camplight-task/ui';
import { Loader2 } from 'lucide-react';
import { CountryCard } from './CountryCard';
import { CountryDetails } from './CountryDetails';
import styles from "./CountryExplorer.module.css";

export const CountryExplorer = () => {
  const {
    countries,
    loading,
    error,
    searchTerm,
    selectedRegion,
    favorites,
    notes,
    hasMore,
    totalFiltered,
    setSearchTerm,
    setSelectedRegion,
    toggleFavorite,
    updateNote,
    loadMore,
    retryFetch,
    clearError,
    regions
  } = useCountries();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (country: Country) => {
    setSelectedCountry(country);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedCountry(null);
  };

  if (loading && countries.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingHeader}>
            <h1 className={styles.loadingTitle}>Country Explorer</h1>
            <p className={styles.loadingSubtitle}>Discover the world, one country at a time</p>
          </div>
          <LoadingGrid />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Country Explorer</h1>
          <p className={styles.subtitle}>Discover the world, one country at a time</p>
        </div>

        {error && (
          <ErrorBanner
            message={error}
            onRetry={retryFetch}
            onDismiss={clearError}
          />
        )}

        <SearchAndFilter
          regions={regions}
          searchTerm={searchTerm}
          selectedRegion={selectedRegion}
          onSearchChange={setSearchTerm}
          onRegionChange={setSelectedRegion}
          totalResults={totalFiltered}
        />

        {countries.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No countries found matching your criteria.</p>
          </div>
        )}

        <div className={styles.grid}>
          {countries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              isFavorite={favorites.has(country.cca3)}
              onToggleFavorite={toggleFavorite}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {hasMore && (
          <div className={styles.loadMore}>
            <Button onClick={loadMore} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className={styles.spinner} />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}

        <CountryDetails
          country={selectedCountry}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails}
          isFavorite={selectedCountry ? favorites.has(selectedCountry.cca3) : false}
          note={selectedCountry ? notes[selectedCountry.cca3] || '' : ''}
          onToggleFavorite={toggleFavorite}
          onUpdateNote={updateNote}
        />
      </div>
    </div>
  );
};

