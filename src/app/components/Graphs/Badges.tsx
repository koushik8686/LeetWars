import React from "react";
import { PinContainer } from "../ui/3d-pin"; // Adjust this path based on your installation
import "./Badge.css";

export default function Badges({ Badges }) {
  return (
    <div className=" overflow-hidden h-100">
    <h2 className="text-5xl text-center font-semibold text-leetcode-orange "> Your Badges <span className="text-white" > - {Badges.length}</span> </h2>    
    <h3 className="text-center text-white m-4">Hover To View Details</h3>
    <div
      style={{ width: "100%" }}
      className="bg-transparent grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
    >
      {Badges.map((badge, index) => (
        <PinContainer
          key={index}
          title={badge.creationDate}
          href="#"
          className="w-full h-full flex justify-center items-center"
        >
          <div className="book bg-gray-900 rounded-lg shadow-lg overflow-hidden">
            <div className="text-center p-2">
              <strong className="text-lg text-white">{badge.displayName}</strong>
            </div>
            <div className="cover flex justify-center items-center">
              <img
                className="img w-32 h-32 object-contain"
                src={badge.icon.startsWith('/') ? `https://leetcode.com${badge.icon}` : badge.icon}
                alt={badge.displayName}
              />
            </div>
          </div>
        </PinContainer>
      ))}
    </div>
    </div>
  );
}
