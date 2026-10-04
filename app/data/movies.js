export const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration: 169,
    poster: "https://fwcdn.pl/fpo/56/29/375629/7670122_2.10.webp",
    showtimes: ["16:00", "19:30"],
    description:
      "Grupa astronautów wyrusza przez tunel czasoprzestrzenny, by znaleźć nowy dom dla ludzkości.",
  },
  {
    id: 2,
    title: "Incepcja",
    genre: "Sci-Fi",
    duration: 148,
    poster: "https://fwcdn.pl/fpo/08/91/500891/7354571_1.10.webp",
    showtimes: ["15:30", "18:00", "21:00"],
    description:
      "Złodziej wykradający sekrety ze snów dostaje zadanie zaszczepienia idei w umyśle celu.",
  },
  {
    id: 3,
    title: "Ojciec chrzestny",
    genre: "Dramat",
    duration: 175,
    poster: "https://fwcdn.pl/fpo/10/89/1089/7196615_1.10.webp",
    showtimes: ["17:00", "20:30"],
    description:
      "Saga rodziny Corleone i walka o władzę w świecie nowojorskiej mafii.",
  },
  {
    id: 4,
    title: "Shrek",
    genre: "Animacja",
    duration: 90,
    poster: "https://fwcdn.pl/fpo/95/09/9509/7640796_1.10.webp",
    showtimes: ["12:00", "14:00", "16:30"],
    description:
      "Zielony ogr wyrusza uratować księżniczkę, by odzyskać swoje bagno.",
  },
  {
    id: 5,
    title: "Zjawa",
    genre: "Przygodowy",
    duration: 156,
    poster: "https://fwcdn.pl/fpo/65/83/586583/7722530_2.10.webp",
    showtimes: ["18:15", "21:15"],
    description:
      "Traper walczy o przetrwanie na dzikim pograniczu i szuka zemsty na zdrajcach.",
  },
  {
    id: 6,
    title: "Truman Show",
    genre: "Komedia",
    duration: 103,
    poster: "https://fwcdn.pl/fpo/01/89/189/7986277_1.10.webp",
    showtimes: ["14:30", "19:00"],
    description:
      "Mężczyzna odkrywa, że całe jego życie jest programem telewizyjnym oglądanym przez miliony.",
  },
];

export const PRICES = { normalny: 25, ulgowy: 18 };
export const ROWS = ["A", "B", "C", "D", "E", "F"];
export const SEATS_PER_ROW = 8;

export function baseOccupied(movieId, time) {
  const seed = movieId * 13 + parseInt(time.replace(":", ""), 10);
  const taken = [];
  ROWS.forEach((r, ri) => {
    for (let n = 1; n <= SEATS_PER_ROW; n++) {
      if ((ri * 8 + n + seed) % 5 === 0 || (ri * 3 + n * 7 + seed) % 11 === 0)
        taken.push(r + n);
    }
  });
  return taken;
}
