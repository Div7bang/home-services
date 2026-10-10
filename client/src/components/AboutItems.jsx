export default function AboutItems({ about }) {
  return about.map((item) => (
    <article className="about-item" key={item.title}>
      <h5 className="about-item-title">{item.title}</h5>
      <p className="about-item-text mb-0">{item.description}</p>
    </article>
  ));
}
