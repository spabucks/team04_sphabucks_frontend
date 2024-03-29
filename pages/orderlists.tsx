import React, { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { totalOrderListsType } from "@/types/orderProduct";

import FirstHeader from "@/components/sections/FirstHeader";

export default function OrderLists() {
  const [orderLists, setOrderLists] = useState<totalOrderListsType[]>([]);
  let date = new Date();

  useEffect(() => {
    const BaseUrl = process.env.baseApiUrl;
    axios
      .get(`${BaseUrl}/api/v1/purchaseHistory/get/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setOrderLists(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <FirstHeader />
      <form className="order-list-page-form">
        <div className="order-list-page-title">
          <h1>주문 내역</h1>
        </div>
        <div className="order-list-page-date">
          <p>전체</p>
          <div className="order-list-page">
            <p>2022.04.06~2023.04.05</p>
          </div>
        </div>

        {orderLists.map((item) => (
          <>
            <div className="order-detail-page-date" key={item.id}>
              <p>{item.orderDate.slice(0, 10)}</p>
              <div className="order-detail-page"></div>
            </div>
            <div className="order-product-card-wrap">
              <div className="order-product-card-inner">
                <div className="order-product-card-left">
                  <img src={item.image} alt="" />
                </div>
                <div className="order-product-card-right">
                  <strong>
                    <p style={{ fontSize: 17 }}>{item.paymentNum}</p>
                  </strong>
                  <p>{item.orderName}</p>
                  <p className="order-product-price">
                    {item.sum}원
                    <span>&nbsp;&nbsp;|&nbsp;&nbsp;{item.amount}개</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        ))}
      </form>
    </>
  );
}
