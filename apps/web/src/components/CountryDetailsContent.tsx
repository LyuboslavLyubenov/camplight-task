
import { Country } from '@camplight-task/domain';
import styles from './CountryDetailsContent.module.css';

interface CountryDetailsContentProps {
  country: Country;
  formatPopulation: (population: number) => string;
  getLanguages: () => string;
  getCurrencies: () => string;
}

const CountryDetailsContent = ({
  country,
  formatPopulation,
  getLanguages,
  getCurrencies,
}: CountryDetailsContentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.flagSection}>
        <div className={styles.flagWrapper}>
          <img
            className={styles.flag}
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
          />
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoTitle}>Country Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Official Name:</span>
              <span>{country.name.official}</span>
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Region:</span>
              <span>{country.region}</span>
            </div>
            
            {country.capital && (
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Capital:</span>
                <span>{country.capital.join(', ')}</span>
              </div>
            )}
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Population:</span>
              <span>{formatPopulation(country.population)}</span>
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Languages:</span>
              <span>{getLanguages()}</span>
            </div>
            
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Currencies:</span>
              <span>{getCurrencies()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailsContent;
