export default function MovieList({ movies, onSelect }) {
  if (movies.length === 0)
    return <p className="empty">Brak filmów spełniających kryteria.</p>;
  return (
    <div className="grid">
      {movies.map((m) => (
        <article className="card" key={m.id}>
          <img
            src={m.poster}
            alt={m.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='420'><rect width='100%' height='100%' fill='#2b2f4a'/><text x='50%' y='50%' fill='#fff' font-size='22' text-anchor='middle' font-family='sans-serif'>${m.title}</text></svg>`,
              )}`;
            }}
          />
          <div className="card-body">
            <h3>{m.title}</h3>
            <p className="meta">
              {m.genre} • {m.duration} min
            </p>
            <p className="desc">{m.description}</p>
            <p className="times">
              {m.showtimes.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </p>
            <button className="btn" onClick={() => onSelect(m)}>
              Wybierz seans
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
