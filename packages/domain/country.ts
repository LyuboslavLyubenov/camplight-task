export interface Country {
    cca3: string;
    name: {
      common: string;
      official: string;
    };
    flags: {
      png: string;
      svg: string;
      alt?: string;
    };
    region: string;
    capital?: string[];
    population: number;
    languages?: Record<string, string>;
    currencies?: Record<string, {
      name: string;
      symbol: string;
    }>;
  }