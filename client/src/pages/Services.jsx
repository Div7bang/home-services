import { Link } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import usePublicData from "../components/usePublicData.js";
import DataGate from "../components/DataGate.jsx";
import PageHeader from "../components/PageHeader.jsx";

const WHY = [
  { icon: "✅", title: "Verified Professionals", text: "All technicians are background-checked and certified before joining our team." },
  { icon: "⏰", title: "On-Time Guarantee", text: "We respect your time. Our technicians arrive within the confirmed time window." },
  { icon: "💰", title: "Transparent Pricing", text: "No hidden charges. You get an upfront quote before any work begins." },
];

export default function Services() {
  usePageTitle("Our Services - Home Service");
  const { data, error } = usePublicData();

  return (
    <>
      <PageHeader title="Our Services" subtitle="Professional home services delivered by certified technicians" />

      <section className="container py-5">
        <DataGate data={data} error={error}>
          {({ services }) => (
            <div className="row g-4">
              {services.map((item) => (
                <div className="col-12 col-sm-6 col-lg-3" key={item.slug}>
                  <div className="card h-100 service-card">
                    <img src={item.image} className="card-img-top service-card-img" alt={item.title} />
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{item.title}</h5>
                      <p className="card-text text-muted small">{item.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                        <span className="text-primary fw-bold">₹{item.price}</span>
                        <span className="text-muted small">{item.duration}</span>
                      </div>
                      <Link to={`/book/${item.slug}`} className="btn btn-dark w-100">Book Now</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DataGate>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Why Choose Us?</h2>
          <div className="row g-4">
            {WHY.map((w) => (
              <div className="col-12 col-md-4" key={w.title}>
                <div className="p-3">
                  <div className="fs-1 mb-2">{w.icon}</div>
                  <h5>{w.title}</h5>
                  <p className="text-muted small">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
