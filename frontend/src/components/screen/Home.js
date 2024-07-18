import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "../Card";
import Carousel from "../Carousel";

export default function App() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:4000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();

      console.log("Fetched Data:", data);

      setFoodItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
     
      <Carousel />
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id}>
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              <div className="row">
                {foodItems.length > 0 &&
                  foodItems
                    .filter((item) => item.CategoryName === category.CategoryName)
                    .map((item) => (
                      <Card
                        key={item._id}
                        name={item.name}
                        image={item.img}
                        price={item.price}
                      />
                    ))}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
