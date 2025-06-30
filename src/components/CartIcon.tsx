import { Dialog, Menu, Popover, Tab, Transition } from "@headlessui/react";
import React from "react";
import { Fragment, useEffect, useState } from "react";
import { clsx } from "clsx";
import { useStore } from "@nanostores/react";
import { isCartOpen, closeCart } from "../script/cartStore";

const cartAnimation = null;

const CartIcon = () => {
  const $isCartOpen = useStore(isCartOpen);
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <Popover>
        {({ close }) => (
          <>
            <Popover.Button
              onClick={() => isCartOpen.set(true)}
              className="group -m-2 flex items-center p-2 text-2xl"
            >
              <i className="fa-solid fa-bag-shopping "></i>
              <span className="ml-2 text-sm font-medium">0</span>
              <span className="sr-only">items in cart, view bag</span>
            </Popover.Button>

            <Transition
              show={$isCartOpen}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 z-10 mt-5 flex w-screen max-w-max -mr-2 ">
                <div className="relative w-screen max-w-md min-h-96 flex-auto overflow-hidden rounded bg-white border shadow-lg ring-1 ring-gray-900/5">
                  {/* Close button */}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => {
                        closeCart();
                        close();
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <span className="sr-only">Close</span>
                      <i className="fa-solid fa-xmark text-xl pr-4"></i>
                    </button>
                  </div>

                  <ul className="p-4">
                    <p className="text-center text-gray-500">
                      No product added to cart yet.
                    </p>
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default CartIcon;
