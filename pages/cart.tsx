import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import axios from "axios";
import Head from "next/head";

import CartList from "@/components/pages/cart/CartList";
import CartMenu from "@/components/pages/cart/CartMenu";
import FirstHeader from "@/components/sections/FirstHeader";
import CartFooter from "@/components/pages/cart/CartFooter";
import ModalCartCountChange from "../components/pages/cart/ModalCartCountChange";
import { cartListType, cartType } from "@/types/cartTypes";

import { cartListState } from "@/state/cartListState";
import { modal } from "@/state/modal";

export default function cart() {
  const [cartList,setCartList] = useRecoilState<cartType>(cartListState);
  const BaseUrl = process.env.baseApiUrl;
  const uuid: string = "85295edc-24ee-4781-b8e3-becc596b010e";
  const [ischangemodal, setIsChangeModal] = useRecoilState<Boolean>(modal);
  const [isChangeCount, setIsChangeCount] = useState<Boolean>(false);

  /**장바구니 조회 */
  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/v1/cart/get/v2/${uuid}`)
      .then((res) => {
        setCartList({
          cartListFreeze: res.data.filter(
            (item: cartListType) => item.bigCategoryId === 1
          ),
          cartList: res.data.filter(
            (item: cartListType) => item.bigCategoryId !== 1
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isChangeCount]);

  return (
    <>
      <Head>
        <title>starbucks cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/favic
        rfon.ico"
        />
      </Head>
      {ischangemodal === true ? (
        <ModalCartCountChange
          isChangeCount={isChangeCount}
          setIsChangeCount={setIsChangeCount}
        />
      ) : (
        <>
          <FirstHeader />
          <CartMenu />
          {(cartList.cartList.length===0 && cartList.cartListFreeze.length===0) ? "": <>
          <CartList />
          <CartFooter /></>}
        </>
      )}
    </>
  );
}
