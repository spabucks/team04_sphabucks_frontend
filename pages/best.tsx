import Head from "next/head";
import { useRouter } from "next/router";

import { useState, useEffect } from "react";

import FirstHeader from "@/components/sections/FirstHeader";
import ProductBestList from "@/components/layouts/ProductBestList";
import TopScrollBtn from "@/components/ui/TopScrollBtn";
import axios from "axios";

import { productBestList } from "@/types/type";
import Loading from "@/components/ui/Loading";

export default function Best() {
  const [data, setData] = useState<productBestList[]>([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const BaseUrl = process.env.baseApiUrl;
    axios
      .get(`${BaseUrl}/api/v1/product/get-best/${router.query.category}`)
      .then((res) => {
        setData(res.data.data);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, [router.query.category]);

  return (
    <>
      <FirstHeader />
      <TopScrollBtn />
      {!isLoading && (
        <div style={{ height: '100vh' }}>
       <Loading/>
       </div>
      )}
      {isLoading && (
        <>
          <ProductBestList itemData={data} />
        </>
      )}
    </>
  );
}
