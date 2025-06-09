
import { X, Star, Edit3 } from 'lucide-react';
import { Country } from '@camplight-task/domain';
import { Dialog, DialogContent, DialogHeader, DialogTitle, Button, Textarea, Label } from '@camplight-task/ui';
import styles from './CountryDetails.module.css';

interface CountryDetailsProps {
  country: Country | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  note: string;
  onToggleFavorite: (countryCode: string) => void;
  onUpdateNote: (countryCode: string, note: string) => void;
}

const CountryDetailsInternal = ({
  country,
  isOpen,
  onClose,
  isFavorite,
  note,
  onToggleFavorite,
  onUpdateNote,
}: CountryDetailsProps) => {
  if (!country) return null;

  const handleNoteChange = (newNote: string) => {
    onUpdateNote(country.cca3, newNote);
  };

  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat().format(population);
  };

  const getLanguages = () => {
    if (!country.languages) return 'N/A';
    return Object.values(country.languages).join(', ');
  };

  const getCurrencies = () => {
    if (!country.currencies) return 'N/A';
    return Object.values(country.currencies)
      .map(currency => `${currency.name} (${currency.symbol})`)
      .join(', ');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <div className={styles.header}>
            <DialogTitle className={styles.title}>
              {country.name.common}
            </DialogTitle>
            <div className={styles.actions}>
              <Button 
                onClick={() => onToggleFavorite(country.cca3)}
                className={isFavorite ? styles.favorite : ''}
              >
                <Star className={isFavorite ? styles.favoriteIcon : ''} />
              </Button>
              <Button onClick={onClose}>
                <X />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className={styles.content}>
          <div className={styles.infoRow}>
            <div className={styles.flagContainer}>
              <img
                src={country.flags.png}
                alt={country.flags.alt || `Flag of ${country.name.common}`}
                className={styles.flag}
              />
            </div>
            <div className={styles.details}>
              <p><span className={styles.label}>Official Name:</span> {country.name.official}</p>
              <p><span className={styles.label}>Capital:</span> {country.capital?.[0] || 'N/A'}</p>
              <p><span className={styles.label}>Region:</span> {country.region}</p>
              <p><span className={styles.label}>Population:</span> {formatPopulation(country.population)}</p>
            </div>
          </div>

          <div className={styles.grid}>
            <div>
              <h3 className={styles.subheading}>Languages</h3>
              <p>{getLanguages()}</p>
            </div>
            <div>
              <h3 className={styles.subheading}>Currencies</h3>
              <p>{getCurrencies()}</p>
            </div>
          </div>

          {isFavorite && (
            <div className={styles.notes}>
              <div className={styles.notesHeader}>
                <Edit3 size={16} />
                <Label htmlFor="note" className={styles.notesLabel}>Personal Notes</Label>
              </div>
              <Textarea
                id="note"
                placeholder="Add your personal notes about this country..."
                value={note}
                onChange={(e) => handleNoteChange(e.target.value)}
                rows={3}
                className={styles.textarea}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryDetailsInternal;
