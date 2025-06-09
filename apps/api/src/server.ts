import fastify from "fastify";

const HARDCODED_COUNTRIES = [
  {
    cca3: "USA",
    name: { common: "United States", official: "United States of America" },
    flags: {
      png: "https://flagcdn.com/w320/us.png",
      svg: "https://flagcdn.com/us.svg",
      alt: "Flag of United States",
    },
    region: "Americas",
    capital: ["Washington, D.C."],
    population: 331002651,
    languages: { eng: "English" },
    currencies: { USD: { name: "United States dollar", symbol: "$" } },
  },
  {
    cca3: "CAN",
    name: { common: "Canada", official: "Canada" },
    flags: {
      png: "https://flagcdn.com/w320/ca.png",
      svg: "https://flagcdn.com/ca.svg",
      alt: "Flag of Canada",
    },
    region: "Americas",
    capital: ["Ottawa"],
    population: 38000000,
    languages: { eng: "English", fra: "French" },
    currencies: { CAD: { name: "Canadian dollar", symbol: "$" } },
  },
  {
    cca3: "GBR",
    name: {
      common: "United Kingdom",
      official: "United Kingdom of Great Britain and Northern Ireland",
    },
    flags: {
      png: "https://flagcdn.com/w320/gb.png",
      svg: "https://flagcdn.com/gb.svg",
      alt: "Flag of United Kingdom",
    },
    region: "Europe",
    capital: ["London"],
    population: 67886011,
    languages: { eng: "English" },
    currencies: { GBP: { name: "British pound", symbol: "£" } },
  },
  {
    cca3: "FRA",
    name: { common: "France", official: "French Republic" },
    flags: {
      png: "https://flagcdn.com/w320/fr.png",
      svg: "https://flagcdn.com/fr.svg",
      alt: "Flag of France",
    },
    region: "Europe",
    capital: ["Paris"],
    population: 67391582,
    languages: { fra: "French" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
  },
  {
    cca3: "DEU",
    name: { common: "Germany", official: "Federal Republic of Germany" },
    flags: {
      png: "https://flagcdn.com/w320/de.png",
      svg: "https://flagcdn.com/de.svg",
      alt: "Flag of Germany",
    },
    region: "Europe",
    capital: ["Berlin"],
    population: 83240525,
    languages: { deu: "German" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
  },
  {
    cca3: "JPN",
    name: { common: "Japan", official: "Japan" },
    flags: {
      png: "https://flagcdn.com/w320/jp.png",
      svg: "https://flagcdn.com/jp.svg",
      alt: "Flag of Japan",
    },
    region: "Asia",
    capital: ["Tokyo"],
    population: 125836021,
    languages: { jpn: "Japanese" },
    currencies: { JPY: { name: "Japanese yen", symbol: "¥" } },
  },
  {
    cca3: "CHN",
    name: { common: "China", official: "People's Republic of China" },
    flags: {
      png: "https://flagcdn.com/w320/cn.png",
      svg: "https://flagcdn.com/cn.svg",
      alt: "Flag of China",
    },
    region: "Asia",
    capital: ["Beijing"],
    population: 1439323776,
    languages: { zho: "Chinese" },
    currencies: { CNY: { name: "Chinese yuan", symbol: "¥" } },
  },
  {
    cca3: "IND",
    name: { common: "India", official: "Republic of India" },
    flags: {
      png: "https://flagcdn.com/w320/in.png",
      svg: "https://flagcdn.com/in.svg",
      alt: "Flag of India",
    },
    region: "Asia",
    capital: ["New Delhi"],
    population: 1380004385,
    languages: { hin: "Hindi", eng: "English" },
    currencies: { INR: { name: "Indian rupee", symbol: "₹" } },
  },
  {
    cca3: "BRA",
    name: { common: "Brazil", official: "Federative Republic of Brazil" },
    flags: {
      png: "https://flagcdn.com/w320/br.png",
      svg: "https://flagcdn.com/br.svg",
      alt: "Flag of Brazil",
    },
    region: "Americas",
    capital: ["Brasília"],
    population: 212559417,
    languages: { por: "Portuguese" },
    currencies: { BRL: { name: "Brazilian real", symbol: "R$" } },
  },
  {
    cca3: "AUS",
    name: { common: "Australia", official: "Commonwealth of Australia" },
    flags: {
      png: "https://flagcdn.com/w320/au.png",
      svg: "https://flagcdn.com/au.svg",
      alt: "Flag of Australia",
    },
    region: "Oceania",
    capital: ["Canberra"],
    population: 25499884,
    languages: { eng: "English" },
    currencies: { AUD: { name: "Australian dollar", symbol: "$" } },
  },
  {
    cca3: "ZAF",
    name: { common: "South Africa", official: "Republic of South Africa" },
    flags: {
      png: "https://flagcdn.com/w320/za.png",
      svg: "https://flagcdn.com/za.svg",
      alt: "Flag of South Africa",
    },
    region: "Africa",
    capital: ["Cape Town", "Pretoria", "Bloemfontein"],
    population: 59308690,
    languages: { afr: "Afrikaans", eng: "English", zul: "Zulu" },
    currencies: { ZAR: { name: "South African rand", symbol: "R" } },
  },
  {
    cca3: "EGY",
    name: { common: "Egypt", official: "Arab Republic of Egypt" },
    flags: {
      png: "https://flagcdn.com/w320/eg.png",
      svg: "https://flagcdn.com/eg.svg",
      alt: "Flag of Egypt",
    },
    region: "Africa",
    capital: ["Cairo"],
    population: 102334404,
    languages: { ara: "Arabic" },
    currencies: { EGP: { name: "Egyptian pound", symbol: "£" } },
  },
];

const server = fastify();

server.get("/countries", async (request, reply) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  return HARDCODED_COUNTRIES;
});

server.get("/countries/:code", async (request, reply) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const { code } = request.params as { code: string };

  if (!code) {
    return HARDCODED_COUNTRIES;
  }

  const country = HARDCODED_COUNTRIES.find((c) => c.cca3 === code);
  if (!country) {
    reply.code(404);
    return { error: "Country not found" };
  }
  return country;
});

const start = async () => {
  try {
    await server.listen({ port: 3001 });
    console.log("Server listening on http://localhost:3001");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
