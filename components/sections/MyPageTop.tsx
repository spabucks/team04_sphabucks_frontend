import Leftarrow from "../ui/Leftarrow";
import { useRecoilState } from "recoil";
import { userState } from "@/state/userState";

export default function MyPageTop() {
  const [loginData, setLoginData] = useRecoilState(userState);
  return (
    <>
    <div className="main-mypage-nickname-container">
       <div className="main-mypage-nickname-title">
          <p><span style={{color:"green"}}>{loginData.nickName}</span>님👩‍🦱 <br/> 환영합니다!</p>
        </div>
        </div>
      <section className="main-mypage">
        <div className="main-mypage-first">
          <p>주문/배송 현황</p>
          <p>최근 3개월 동안 구매한 상품</p>
        </div>
        <div className="main-mypage-step">
          <div className="main-mypage-step__product">
            <p>0</p>
            <p>상품준비중</p>
          </div>
         <Leftarrow/>
          <div className="main-mypage-step__product">
            <p>0</p>
            <p>배송준비중</p>
          </div>
          <Leftarrow/>
          <div className="main-mypage-step__product">
            <p>0</p>
            <p>배송중</p>
          </div>
          <Leftarrow/>
          <div className="main-mypage-step__product">
            <p>0</p>
            <p>배송완료</p>
          </div>
        </div>
      </section>
    </>
  );
}
