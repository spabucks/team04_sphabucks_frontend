import Link from "next/link";
import { headerRightIcons } from "@/data/navMenuDatas";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <div className="main-header-top">
        <div className="main-header__menu-icon">
          <Link href={`/subpage`}>
            <Image
              src="assets/images/icons/menu.svg"
              alt=""
              width={20}
              height={20}
            ></Image>
          </Link>
        </div>
        <Link href="/" className="mainpage-link">
          <h1>온라인 스토어</h1>
        </Link>
        <nav>
          <ul>
            {headerRightIcons.map((menuIcon) => (
              <li key={menuIcon.id}>
                <Link href={menuIcon.link}>
                  <Image
                    width={20}
                    height={20}
                    src={menuIcon.icon}
                    alt={menuIcon.name}
                  ></Image>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
