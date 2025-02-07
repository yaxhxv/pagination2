import { useEffect, useState } from "react";
import "./styles.css";
import Card from "./components/Card";

export default function App() {
  const [products, setproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    setproducts(json.products);
  };
  const handleClick = (n) => {
    setCurrentPage(n);
  };

  const handleLeft = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleRight = () => {
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const PAGE_SIZE = 10;
  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="pagination">
        <button
          disabled={currentPage <= 0}
          className="pagination-container"
          onClick={handleLeft}
        >
          ◀️
        </button>
        {[
          ...Array(noOfPages)
            .keys()
            .map((n) => (
              <span
                key={n}
                className={`pagination-container ${
                  currentPage === n ? "active" : ""
                }`}
                onClick={() => handleClick(n)}
              >
                {n + 1}{" "}
              </span>
            )),
        ]}
        <button
          disabled={currentPage >= noOfPages - 1}
          className="pagination-container"
          onClick={handleRight}
        >
          ▶️
        </button>
      </div>
      <div className="grid">
        {products.slice(start, end).map((item, index) => (
          <div className="container" key={index}>
            <Card image={item.images} title={item.title} price={item.price} />
          </div>
        ))}
      </div>
    </div>
  );
}
