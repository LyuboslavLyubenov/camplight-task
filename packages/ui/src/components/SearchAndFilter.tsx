import { Input } from "./Input";
import styles from "./SearchAndFilter.module.css";

interface SearchAndFilterProps {
  searchTerm: string;
  selectedRegion: string;
  onSearchChange: (term: string) => void;
  onRegionChange: (region: string) => void;
  totalResults: number;
  regions: string[];
  searchPlaceholder?: string;
  filterPlaceholder?: string;
}

export const SearchAndFilter = ({
  searchTerm,
  selectedRegion,
  onSearchChange,
  onRegionChange,
  totalResults,
  regions,
  searchPlaceholder = "Search...",
  filterPlaceholder = "Filter by...",
}: SearchAndFilterProps) => {
  return (
    <div className={styles.container}>
      <Input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.filterWrapper}>
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">{filterPlaceholder}</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {totalResults >= 0 && (
        <div className={styles.resultsCount}>
          {totalResults} {totalResults === 1 ? "result" : "results"} found
        </div>
      )}
    </div>
  );
};
