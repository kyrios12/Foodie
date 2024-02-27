import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

function Home() {

   let [foodCat,setFoodCat] = useState([]);
   let [foodItem,setFoodItem] = useState([]);


   const loadData = async () => {
    try {
        let response = await fetch("http://localhost:8080/food/foodata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        response = await response.json();
        console.log(response); // Log the response for debugging
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
   
   useEffect(()=>{
     loadData();
   },[])


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
      {
          foodCat.length !== 0
          ? foodCat.map((data)=>{
            return (
              <div className="row mb-3">
              <div key={data.id} className="fs-3 m-3">{data.CategoryName}</div>
              <hr></hr>
              {
              foodItem.length !== 0
              ? foodItem.filter((item)=>item.CategoryName === data.CategoryName)
              .map((food)=>{
                return (
                  <div key={food.id} className="col-12 col-md-6 col-lg-3">
                  <Card foodname = {food.name} options ={food.options} imgSrc = {food.img}></Card>
                  </div>
                )
              }) : "No such data"
              }
              </div>
            )
          })
          : <div><h1>Loading...</h1></div>
        }
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
