import { PRICES } from "../data/movies";

export default function Summary({ data, onReset }) {
  return (
    <div className="panel summary">
      <h2>✅ Rezerwacja potwierdzona</h2>
      <ul>
        <li>
          <b>Film:</b> {data.title}
        </li>
        <li>
          <b>Seans:</b> {data.time}
        </li>
        <li>
          <b>Miejsca:</b> {data.seats.join(", ")}
        </li>
        <li>
          <b>Bilety:</b> {data.seats.length} × {data.ticket} (
          {PRICES[data.ticket]} zł)
        </li>
        <li>
          <b>Do zapłaty:</b> {data.total} zł
        </li>
        <li>
          <b>Rezerwujący:</b> {data.firstName} {data.lastName} ({data.email})
        </li>
      </ul>
      <button className="btn" onClick={onReset}>
        Wróć do repertuaru
      </button>
    </div>
  );
}
