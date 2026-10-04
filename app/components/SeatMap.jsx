import { ROWS, SEATS_PER_ROW } from "../data/movies";

export default function SeatMap({ occupied, selected, onToggle }) {
  return (
    <div className="seatmap">
      <div className="screen">EKRAN</div>
      {ROWS.map((r) => (
        <div className="seat-row" key={r}>
          <span className="row-label">{r}</span>
          {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
            const id = r + (i + 1);
            const isTaken = occupied.includes(id);
            const isSel = selected.includes(id);
            const cls = isTaken
              ? "seat taken"
              : isSel
                ? "seat selected"
                : "seat free";
            return (
              <button
                key={id}
                type="button"
                className={cls}
                disabled={isTaken}
                title={id}
                onClick={() => onToggle(id)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      ))}
      <div className="legend">
        <span>
          <i className="seat free" /> wolne
        </span>
        <span>
          <i className="seat taken" /> zajęte
        </span>
        <span>
          <i className="seat selected" /> wybrane
        </span>
      </div>
    </div>
  );
}
