export default function BookingForm({ form, setForm, errors, onSubmit }) {
  const field = (name, label, type = "text") => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        value={form[name]}
        className={errors[name] ? "invalid" : ""}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );
  return (
    <form onSubmit={onSubmit} noValidate>
      {field("firstName", "Imię")}
      {field("lastName", "Nazwisko")}
      {field("email", "E-mail", "email")}
      <button type="submit" className="btn btn-big">
        Zatwierdź rezerwację
      </button>
    </form>
  );
}
