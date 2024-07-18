import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { BackgroundGradient } from "../ui/background-gradient";

export default function Card({ id, name, image, description, price }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("half");

  const handleAddToCart = () => {
    const item = { id, name, image, price, quantity, size };
    addToCart(item);
  };

  return (
    <CardContainer className="inter-var col-md-4 col-sm-6 mb-4">
      <BackgroundGradient>
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {description}
          </CardItem>
          <CardItem
            translateZ="100"
            rotateX={20}
            rotateZ={-10}
            className="w-full mt-4"
          >
            <img
              src={image}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={name}
            />
          </CardItem>
          <div className="flex flex-col justify-between items-center mt-4">
            <div className="d-flex align-items-center mb-2">
              <select
                className="form-select flex-grow-1 me-2"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {Array.from(Array(10), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select>
            </div>
            <div className="d-inline fs-5">
              Total Price: ${(price * quantity).toFixed(2)}
            </div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </CardBody>
      </BackgroundGradient>
    </CardContainer>
  );
}
