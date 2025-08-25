import React from "react";
import icon from "../assets/icon.png";

import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

const Why_Choose_Us = () => {
  const boxData = [
    {
      image: "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-04.png", 
      title: "Big Discounts",
      description: "Grab unbeatable deals now! Enjoy big discounts on your favorite items—limited time only!",
    },
    {
      image: "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-01.png",
      title: "Fast Delivery",
      description: "Get your orders delivered lightning-fast. Reliable, same-day shipping available on select items!",
    },
    {
      image: "https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/icon-02.png",
      title: "Secure Payments",
      description: "Your security is our priority. All payments are encrypted and processed through trusted, secure gateways.",
    },
    {
      image: icon,
      title: "Easy Returns",
      description: "Returning something is easy—just a few clicks and you’re done. No stress involved.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {boxData.map((box, index) => (
          <div
            key={index}
            className="bg-white p-6 text-center flex flex-col items-center justify-center"
          >
            <img src={box.image} alt=""  className="w-[100px] h-[100px]"/>
            <h3 className="text-lg font-semibold mt-4">{box.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{box.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Why_Choose_Us;
