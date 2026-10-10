import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import { api } from "../api.js";
import PageHeader from "../components/PageHeader.jsx";
import NotFound from "./NotFound.jsx";

const EMPTY_FORM = { name: "", phone: "", address: "", date: "", time: "", notes: "" };

export default function BookService() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState({ text: "", color: "#333" });

  usePageTitle(service ? `Book Service - ${service.title}` : "Book Service - Home Service");

  useEffect(() => {
    setStatus("loading");
    api.get(`/service/${encodeURIComponent(slug)}`).then(({ ok, status, data }) => {
      if (ok && data.service) { setService(data.service); setStatus("ready"); }
      else if (status === 404) setStatus("notfound");
      else setStatus("error");
    }).catch(() => setStatus("error"));
  }, [slug]);

  const today = new Date().toISOString().split("T")[0];
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Payload kept for when a real booking API exists
    const payload = { ...form, serviceSlug: service.slug, serviceTitle: service.title };
    void payload;
    setMessage({ text: "Processing your booking...", color: "#333" });
    // Simulate booking confirmation (replace with real API call when backend booking model is ready)
    setTimeout(() => {
      setMessage({ text: "✅ Booking confirmed! Our team will contact you shortly to confirm the appointment.", color: "#16a34a" });
      setForm(EMPTY_FORM);
    }, 1000);
  };

  if (status === "loading") return <div className="container py-5 text-center text-muted">Loading...</div>;
  if (status === "notfound") return <NotFound />;
  if (status === "error") return <div className="container py-5 text-center text-danger">Failed to load service.</div>;

  return (
    <>
      <PageHeader compact title={`Book: ${service.title}`} subtitle="Fill in your details and we will confirm your appointment" />

      <section className="container py-5">
        <div className="row g-5 justify-content-center">
          {/* Service Details */}
          <div className="col-12 col-lg-5">
            <div className="book-service-card">
              <img src={service.image} alt={service.title} className="book-service-img" />
              <h3 className="fw-bold mb-2">{service.title}</h3>
              <p className="text-muted">{service.description}</p>
              <div className="d-flex gap-3 mt-3">
                <div className="text-center p-3 bg-light rounded flex-fill">
                  <div className="fs-4 fw-bold text-primary">₹{service.price}</div>
                  <div className="small text-muted">Starting Price</div>
                </div>
                <div className="text-center p-3 bg-light rounded flex-fill">
                  <div className="fs-5 fw-bold text-dark">{service.duration}</div>
                  <div className="small text-muted">Duration</div>
                </div>
              </div>
              <div className="mt-4">
                <h6 className="fw-bold">What's Included:</h6>
                <ul className="text-muted small">
                  <li>Certified and verified technician</li>
                  <li>Quality materials and tools</li>
                  <li>Post-service cleanup</li>
                  <li>30-day service warranty</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="col-12 col-lg-5">
            <div className="book-service-card">
              <h4 className="fw-bold mb-4">Your Booking Details</h4>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Full Name *</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Enter your full name" required value={form.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label fw-semibold">Phone Number *</label>
                  <input type="tel" className="form-control" id="phone" name="phone" placeholder="+91 98765 43210" required value={form.phone} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-semibold">Service Address *</label>
                  <input type="text" className="form-control" id="address" name="address" placeholder="Full address for service visit" required value={form.address} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label fw-semibold">Preferred Date *</label>
                  <input type="date" className="form-control" id="date" name="date" min={today} required value={form.date} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="time" className="form-label fw-semibold">Preferred Time *</label>
                  <input type="time" className="form-control" id="time" name="time" required value={form.time} onChange={onChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="notes" className="form-label fw-semibold">Additional Notes</label>
                  <textarea className="form-control" id="notes" name="notes" rows="3" placeholder="Describe the issue or any special instructions..." value={form.notes} onChange={onChange}></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100 py-2 fw-semibold">Confirm Booking</button>
              </form>
              <div className="mt-3 text-center fw-semibold" style={{ color: message.color }}>{message.text}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
