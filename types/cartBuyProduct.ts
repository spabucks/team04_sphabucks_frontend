import { cartListType, cartType } from "./cartTypes";
import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist();

export const cartBuyProduct = atom<cartListType[]>({
  key: "cartBuyProduct",
  default: [],
  // effects_UNSTABLE: [persistAtom]
});