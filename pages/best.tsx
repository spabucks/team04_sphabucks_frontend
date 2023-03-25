import Head from "next/head";
import FirstHeader from "@/components/sections/FirstHeader";
import ProductBestList from "@/components/layouts/ProductBestList";
import axios from "axios";
import { useState, useEffect } from "react";
import { productBestList } from "@/types/type";
import { useRouter } from "next/router";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

export default function Best() {
  const [data, setData] = useState<productBestList[]>([]);
  const BaseUrl = process.env.baseApiUrl;
  const count = data.length;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BaseUrl}/api/v1/product/get-best/${router.query.category}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [router.query.category]);
  return (
    <>
      <Head>
        <title>Best-Product</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="/favic
        rfon.ico"
        />
      </Head>
      {isLoading && (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
          <Image src="/images/wireframe/short-paragraph.png" />
        </Segment>
      )}
      {!isLoading && (
        <>
          <FirstHeader />
          <ProductBestList itemData={data} />
        </>
      )}
    </>
  );
}
