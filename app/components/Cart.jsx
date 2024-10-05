import React, { useEffect, useRef, useState, useContext } from "react";
import ShopContext from "../context/shopContext";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import userContext from "../context/userContext";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

const Cart = ({ setShowCart, showCart }) => {
  const { getCart, cart, removeFromCart, removeOneFromCart, addToCart } =
    useContext(ShopContext);

  const { user } = useContext(userContext);

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, []);

  return (
    <>
      {showCart && (
        <div className="fixed top-0 right-0 bg-white p-4 w-[500px] border-2 h-full overflow-y-auto">
          <div className="flex justify-between">
            <div></div>
            <h1 className="text-center content-center text-xl font-semibold">
              Cart
            </h1>
            <button onClick={() => setShowCart(false)} className="text-2xl">
              x
            </button>
          </div>
          <hr />
          <div className="flex flex-col">
            <div className="flex flex-col justify-between mt-4 space-y-10">
              {cart?.length > 0 ? (
                cart.map((item) => {
                  return (
                    <div key={item.product._id} className="flex relative">
                      <AdvancedImage
                        className="mx-auto"
                        cldImg={cld
                          .image(`${item.product.imageUrl}`)
                          .addTransformation(
                            "q_auto,c_auto,g_auto,h_150,w_200,r_10"
                          )}
                      />
                      <span
                        className="flex text-gray-500 text-sm absolute bg-white rounded-md border-2 -bottom-3 left-16
                     h-fit"
                      >
                        <button
                          onClick={() => addToCart(item.product._id)}
                          className="px-2"
                        >
                          +
                        </button>
                        <span className="px-2 border-l-2 border-r-2 text-black font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => removeOneFromCart(item.product._id)}
                          className="px-2"
                        >
                          -
                        </button>
                      </span>
                      <div className="ml-4 relative text-sm font-medium">
                        <h1>{item.product.productName}</h1>
                        <p className="mt-3">{item.product.price}</p>
                        <button
                          onClick={() => {
                            removeFromCart(item.product._id);
                          }}
                          className="text-xs text-red-500 absolute bottom-0"
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h1>No items in cart</h1>
              )}
            </div>
          </div>
          {cart.length > 0 && (
            <button className="bg-primary-purple rounded-sm text-white font-medium px-8 py-0.5 flex mx-auto mb-10 mt-20">
              Proceed
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
