export default function PageHeader({ title, subtitle, compact = false }) {
  return (
    <section className={`bg-dark text-white ${compact ? "py-4" : "py-5"} text-center`}>
      <div className="container">
        <h1 className="fw-bold">{title}</h1>
        {subtitle && <p className="text-white-50 mb-0">{subtitle}</p>}
      </div>
    </section>
  );
}
