import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import SearchHeader from "@/components/pages/search/SearchHeader";
import ProductSearchList from "@/components/pages/search/ProductSearchList";
import FirstHeader from "@/components/sections/FirstHeader";

import { filterProductList } from "@/types/type";

export default function Search2() {
  const router = useRouter();
  const [productList, setProductList] = useState<filterProductList[]>([]);
  const [first, setFirst] = useState<boolean>(true);
  const [check, setCheck] = useState<boolean>(true);
  const { query } = useRouter();

  useEffect(() => {
    const BaseUrl = process.env.baseApiUrl;
    const keyword = router.asPath.split("?keyword=")[1];
    axios
      .get(`${BaseUrl}/api/v1/product/search2?keyword=${keyword}`)
      .then((res) => {
        setProductList(res.data.data);
        if (res.data.data.length !== 0) {
          setCheck(false); //검색결과 있음
          setFirst(false);
        } else {
          setCheck(true); //검색결과 없음
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router]);

  return (
    <>
      <FirstHeader />
      <div className="search-title">&quot;{query.keyword}&quot;의 검색결과</div>
      {check === true && first === true ? (
        <div className="search-prodcut-title">검색 결과가 없습니다.</div>
      ) : (
        <div className={first === true ? "hide" : ""}>
          <SearchHeader />
          <ProductSearchList productData={productList} />
        </div>
      )}
    </>
  );
}
