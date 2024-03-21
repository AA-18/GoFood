import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function CardSection() {
    const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8080/api/foodData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="container">
        {
        foodCat!=[] ? foodCat.map((category)=>{
            return (
                <div className="row mb-3">
                    <div key={category._id} className="fs-3 m-3">
                        {category.CategoryName}
                    </div>
                    <hr />
                    {
                        foodItem!=[]
                        ?
                        foodItem.filter((item) => item.CategoryName==category.CategoryName).map(matchingItems =>{
                            return (
                                <div key={matchingItems._id} className="col-12 col-md-6 col-lg-4"> 
                                    <Card {...matchingItems}/>
                                </div>
                            )
                        })
                        :""
                    }
                </div>
            )
        })
            :""
            }
    </div>
  )
}
