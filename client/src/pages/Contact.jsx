import { useState } from "react";
import usePageTitle from "../usePageTitle.js";
import PageHeader from "../components/PageHeader.jsx";

const EMPTY = { name: "", email: "", phone: "", service: "", message: "" };

export default function Contact() {
  usePageTitle("Contact - Home Service");
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm(EMPTY);
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Get in touch to book a service or ask any questions" />

      <section className="container py-5">
        <div className="row g-5 justify-content-center">
          {/* Contact Info */}
          <div className="col-12 col-lg-4">
            <h4 className="fw-bold mb-4">Get In Touch</h4>
            <InfoRow icon="📍" title="Address" lines={["123 Main Street, Ludhiana, Punjab, India"]} />
            <InfoRow icon="📞" title="Phone" lines={["(123) 456-7890", "Emergency: (123) 456-9999"]} />
            <InfoRow icon="✉️" title="Email" lines={["info@homeservice.com", "support@homeservice.com"]} />
            <InfoRow icon="⏰" title="Working Hours" lines={["Mon – Sat: 8:00 AM – 8:00 PM", "Sunday: 10:00 AM – 5:00 PM"]} last />
          </div>

          {/* Contact Form */}
          <div className="col-12 col-lg-6">
            <div className="contact-form-wrap">
              <h4 className="fw-bold mb-4">Send Us a Message</h4>
              <form onSubmit={onSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="cname" className="form-label fw-semibold">Full Name *</label>
                    <input type="text" className="form-control" id="cname" name="name" placeholder="Your full name" required value={form.name} onChange={onChange} />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="cemail" className="form-label fw-semibold">Email *</label>
                    <input type="email" className="form-control" id="cemail" name="email" placeholder="your@email.com" required value={form.email} onChange={onChange} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="cphone" className="form-label fw-semibold">Phone Number</label>
                    <input type="tel" className="form-control" id="cphone" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={onChange} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="cservice" className="form-label fw-semibold">Service Required</label>
                    <select className="form-select" id="cservice" name="service" value={form.service} onChange={onChange}>
                      <option value="">Select a service</option>
                      <option>Plumbing &amp; Leaks</option>
                      <option>Electrical &amp; Fixtures</option>
                      <option>HVAC &amp; Cooling</option>
                      <option>Deep Cleaning</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="cmessage" className="form-label fw-semibold">Message *</label>
                    <textarea className="form-control" id="cmessage" name="message" rows="4" placeholder="Describe your issue or query..." required value={form.message} onChange={onChange}></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-dark w-100 py-2 fw-semibold">Send Message</button>
                  </div>
                </div>
              </form>
              {sent && (
                <div className="mt-3 text-center fw-semibold" style={{ color: "#16a34a" }}>
                  ✅ Thank you! Your message has been received. We will contact you within 24 hours.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, title, lines, last = false }) {
  return (
    <div className={`d-flex align-items-start ${last ? "" : "mb-4"}`}>
      <div className="fs-3 me-3">{icon}</div>
      <div>
        <h6 className="fw-bold mb-1">{title}</h6>
        {lines.map((l) => <p className="text-muted mb-0" key={l}>{l}</p>)}
      </div>
    </div>
  );
}
