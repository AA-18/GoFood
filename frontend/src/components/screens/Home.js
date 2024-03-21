import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Carousel from "../Carousel";
import CardSection from "../CardSection";
import { CartProvider } from "../ContextReducer";

export default function Home() {
  return (
    <CartProvider>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="m-3">
        <CardSection />
      </div>
      <div>
        <Footer />
      </div>
    </CartProvider>
  );
}
