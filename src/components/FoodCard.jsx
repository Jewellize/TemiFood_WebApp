import React from "react";

function FoodCard(props) {
  return (
    <div>
      <div className="flex justify-center">
        <img src={props.src} className="object-cover h-48 w-full"></img>
      </div>
      <div className="flex justify-between px-3 py-2">
        <div>{props.name}</div>
        <div>{props.price}</div>
      </div>
    </div>
  );
}

export default FoodCard;
