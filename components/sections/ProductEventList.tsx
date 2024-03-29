
import Image from "next/image";
import { getImageSize } from "react-image-size";
import { useEffect, useState } from "react";

import { eventProductList } from "@/types/type";
import EventProductList from "../layouts/EventProductList";

export default function ProductEventList(props: {
  id: number;
  imgUrl: string;
  itemData: eventProductList[];
}) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    getImageSize(props.imgUrl).then((res) => {
      setSize({ width: res.width, height: res.height });
    });
  }, [props.imgUrl]);

  return (
    <>
      <section className="event-page-banner">
        <Image
          src={props.imgUrl}
          alt="event-cake-banner"
          width={size.width}
          height={size.height}
        ></Image>
      </section>
      <EventProductList itemData={props.itemData} />
    </>
  );
}
