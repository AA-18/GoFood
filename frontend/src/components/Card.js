import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options[0];
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props._id) {
        food = item;
        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food != []) {
      if (food.size == size) {
        await dispatch({
          type: "UPDATE",
          id: props._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props._id,
          name: props.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props._id,
      name: props.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.img,
    });
    console.log(data);
  };
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div
        className="card mt-3 w-75"
        style={{ width: "18rem", height: "400px", textAlign: "center" }}
      >
        <img
          src={props.img}
          className="card-img-top"
          alt="..."
          style={{ height: "240px", objectFit: "Fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          {/* <p className="card-text">{props.description.slice(0,60)+"..."}</p> */}
          <div className="container w-100 ">
            <div className="d-flex justify-content-center">
              <select
                className="m-2 h-100 bg-danger rounded text-white"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 bg-danger rounded text-white"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {
                  // console.log(props.options)
                  priceOptions.map((option) => {
                    return (
                      <>
                        <option key={option} value={option}>
                          {option}
                        </option>
                      </>
                    );
                  })
                }
                {/* <option value="half">Half</option>
              <option value="full">Full</option> */}
              </select>
              <div className="fs-5 m-1">₹{finalPrice}/-</div>
            </div>

            <hr />
            <div className="d-flex justify-content-center">
              <button className="btn btn-danger ms-2" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
