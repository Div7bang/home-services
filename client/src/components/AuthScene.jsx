// Shared full-width background scene used by login / signup / admin-login pages
export default function AuthScene({ alt, children }) {
  return (
    <section className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-12">
          <div className="admin-login-scene">
            <img src="/images/adminlogin.jpg" alt={alt} className="admin-login-image" />
            <div className="admin-login-form-wrap">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
