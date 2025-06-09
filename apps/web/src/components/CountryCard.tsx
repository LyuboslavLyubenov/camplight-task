import React from "react";
import { Star } from "lucide-react";
import { Country } from "@camplight-task/domain";
import { Card, CardContent, Button } from "@camplight-task/ui";
import styles from "./CountryCard.module.css";

type CountryCardProps = {
  country: Country;
  isFavorite: boolean;
  onToggleFavorite: (countryCode: string) => void;
  onViewDetails: (country: Country) => void;
};

export const CountryCard = ({
  country,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}: CountryCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(country.cca3);
  };

  return (
    <Card onClick={() => onViewDetails(country)}>
      <CardContent>
        <div className={styles.header}>
          <img
            className={styles.flag}
            src={country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            loading="lazy"
          />
          <Button onClick={handleFavoriteClick}>
            <Star className={isFavorite ? styles.favorite : ""} />
          </Button>
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>{country.name.common}</h3>
          <p className={styles.region}>{country.region}</p>
          {country.capital && (
            <p className={styles.capital}>Capital: {country.capital[0]}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
