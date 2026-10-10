// Renders a loading / error state until public data is available
export default function DataGate({ data, error, children }) {
  if (error) return <div className="container py-5 text-center text-danger">{error}</div>;
  if (!data) return <div className="container py-5 text-center text-muted">Loading...</div>;
  return children(data);
}
