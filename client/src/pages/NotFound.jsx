import { Link } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";

export default function NotFound() {
  usePageTitle("Page Not Found - Home Service");
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
      <div className="text-center">
        <div style={{ fontSize: "5rem" }}>🏠</div>
        <h1 className="fw-bold display-4">404</h1>
        <p className="text-muted fs-5">Oops! Page not found.</p>
        <Link to="/" className="btn btn-dark px-4">Go Home</Link>
      </div>
    </div>
  );
}
