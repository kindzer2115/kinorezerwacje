"use client";

import { useState, useEffect } from "react";
import "./App.css";

import { movies, PRICES, baseOccupied } from "./data/movies";
import Filters from "./components/Filters";
import MovieList from "./components/MovieList";
import SeatMap from "./components/SeatMap";
import BookingForm from "./components/BookingForm";
import Summary from "./components/Summary";

export default function App() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("Wszystkie");
  const [movie, setMovie] = useState(null);
  const [time, setTime] = useState(null);
  const [selected, setSelected] = useState([]);
  const [ticket, setTicket] = useState("normalny");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState({});
  const [bookings, setBookings] = useState({});
  const [summary, setSummary] = useState(null);

  const genres = ["Wszystkie", ...new Set(movies.map((m) => m.genre))];
  const filtered = movies.filter(
    (m) =>
      (genre === "Wszystkie" || m.genre === genre) &&
      m.title.toLowerCase().includes(query.toLowerCase().trim()),
  );

  useEffect(() => {
    document.title = movie ? `Rezerwacja – ${movie.title}` : "Kino – repertuar";
  }, [movie]);

  const key = movie && time ? `${movie.id}-${time}` : null;
  const occupied = key
    ? [...baseOccupied(movie.id, time), ...(bookings[key] || [])]
    : [];
  const total = selected.length * PRICES[ticket];

  const pickMovie = (m) => {
    setMovie(m);
    setTime(m.showtimes[0]);
    setSummary(null);
    setSelected([]);
    setErrors({});
    window.scrollTo(0, 0);
  };

  const toggleSeat = (id) =>
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );

  const reset = () => {
    setMovie(null);
    setTime(null);
    setSummary(null);
    setForm({ firstName: "", lastName: "", email: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.firstName.trim()) err.firstName = "Podaj imię.";
    if (!form.lastName.trim()) err.lastName = "Podaj nazwisko.";
    if (!form.email.trim()) err.email = "Podaj adres e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Nieprawidłowy format e-mail.";
    if (selected.length === 0) err.seats = "Wybierz co najmniej jedno miejsce.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setBookings({
      ...bookings,
      [key]: [...(bookings[key] || []), ...selected],
    });
    setSummary({
      title: movie.title,
      time,
      seats: [...selected].sort(),
      ticket,
      total,
      ...form,
    });
    setSelected([]);
  };

  return (
    <div className="app">
      <header>
        <h1 onClick={reset}>🎬 Kino Reżyser</h1>
        <p>Wybierz film, seans i zarezerwuj miejsca</p>
      </header>

      <main>
        {summary ? (
          <Summary data={summary} onReset={reset} />
        ) : !movie ? (
          <>
            <Filters
              query={query}
              setQuery={setQuery}
              genre={genre}
              setGenre={setGenre}
              genres={genres}
            />
            <MovieList movies={filtered} onSelect={pickMovie} />
          </>
        ) : (
          <div className="panel">
            <button className="btn btn-light" onClick={reset}>
              ← Wróć do repertuaru
            </button>
            <h2>
              {movie.title}{" "}
              <small>
                ({movie.genre}, {movie.duration} min)
              </small>
            </h2>

            <h3>1. Wybierz seans</h3>
            <div className="times">
              {movie.showtimes.map((t) => (
                <button
                  key={t}
                  className={`chip chip-btn ${t === time ? "active" : ""}`}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <h3>2. Wybierz miejsca</h3>
            <SeatMap
              occupied={occupied}
              selected={selected}
              onToggle={toggleSeat}
            />
            {errors.seats && <p className="error">{errors.seats}</p>}

            <h3>3. Rodzaj biletu</h3>
            <div className="tickets">
              {Object.entries(PRICES).map(([type, price]) => (
                <label
                  key={type}
                  className={ticket === type ? "ticket active" : "ticket"}
                >
                  <input
                    type="radio"
                    name="ticket"
                    checked={ticket === type}
                    onChange={() => setTicket(type)}
                  />
                  {type} – {price} zł
                </label>
              ))}
            </div>

            <div className="status">
              <span>
                Wybrane miejsca: <b>{selected.length}</b>
                {selected.length > 0 && ` (${[...selected].sort().join(", ")})`}
              </span>
              <span>
                Cena: <b>{total} zł</b>
              </span>
            </div>

            <h3>4. Dane rezerwującego</h3>
            <BookingForm
              form={form}
              setForm={setForm}
              errors={errors}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </main>
    </div>
  );
}
