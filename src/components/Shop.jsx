export default function Shop({ children }) {
  return (
    <section id="shop">
      <h2>Delicious Orange-Inspired Foods</h2>

      <ul id="products">{children}</ul>
    </section>
  );
}
