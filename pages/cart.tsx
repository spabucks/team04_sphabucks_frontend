import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue} from "recoil";

import axios from "axios";
import Head from "next/head";

import Logincheck from "@/components/ui/Logincheck";
import CartList from "@/components/pages/cart/CartList";
import CartMenu from "@/components/pages/cart/CartMenu";
import FirstHeader from "@/components/sections/FirstHeader";
import CartFooter from "@/components/pages/cart/CartFooter";
import ModalCartCountChange from "../components/pages/cart/ModalCartCountChange";

import { cartListType, cartType } from "@/types/cartTypes";
import SecondHeader from "@/components/layouts/SecondHeader";

import { cartListState } from "@/state/cartListState";
import { modal } from "@/state/modal";
import { userState } from "@/state/userState";
import { cartFetchCheck } from "@/state/cartFetchCheck";
import { detailProduct } from "@/types/type";

export default function Cart() {

  const [cartList, setCartList] = useRecoilState<cartType>(cartListState);
  const fetchCheck = useRecoilValue(cartFetchCheck)
  const [ischangemodal, setIsChangeModal] = useRecoilState<Boolean>(modal);
  const [isChangeCount, setIsChangeCount] = useState<Boolean>(false);
  const [loginData, setLoginData] = useRecoilState(userState);

  /**장바구니 조회 */

  // const fecthCartData = () => {
  //   axios
  //   .get(`${BaseUrl}/api/v1/cart/get/v2`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res)
  //     setCartList({
  //       cartListFreeze: res.data.filter(
  //         (item: cartListType) => item.bigCategoryId === 1
  //       ),
  //       cartList: res.data.filter(
  //         (item: cartListType) => item.bigCategoryId !== 1
  //       ),
  //     });
  //     console.log('res',res)
  //     console.log('@@@@@@@@@@@@@@@@', res.request.status)
  //     if(res.request.status===404){
  //       <Link href={'/cart'}></Link>
  //     }
  //   }
   
  //   )
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  console.log('cartList',cartList)
  useEffect(()=>{
    const BaseUrl = process.env.baseApiUrl;
    axios
      .get(`${BaseUrl}/api/v1/cart/get/v2`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res)=>{
        if(res.status === 200) {
          setCartList({
            cartListFreeze: res.data.data.filter(
              (item: cartListType) => item.bigCategoryId === 1
            ),
            cartList: res.data.data.filter(
              (item: cartListType) => item.bigCategoryId !== 1
            ),
          });
        }
      })
      .catch(err=>{
        console.log(err)
      })
  },[isChangeCount, fetchCheck])
  
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
      {ischangemodal === true /*&& loginData.isLogin === true*/ ? (
        <ModalCartCountChange
          isChangeCount={isChangeCount}
          setIsChangeCount={setIsChangeCount}
          // data={props.data.}
        />
      ) : (
        ischangemodal === false &&
        /*loginData.isLogin === true &&*/ (
          <>
           <SecondHeader title={"온라인스토어"}></SecondHeader>
            <CartMenu />
            {cartList.cartList.length === 0 &&
            cartList.cartListFreeze.length === 0 ? (
              ""
            ) : (
              <>
                <CartList />
                <CartFooter />
              </>
            )}
          </>
        )
      )}
      {loginData.isLogin === false && (
        <>
          <SecondHeader title={"온라인스토어"}></SecondHeader>
          <Logincheck></Logincheck>
        </>
      )}
    </>
  );
}
