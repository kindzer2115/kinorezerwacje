export default function Filters({ query, setQuery, genre, setGenre, genres }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Szukaj filmu po tytule..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}
