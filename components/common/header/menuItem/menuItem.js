import Link from "next/link";
import { useRouter } from "next/router";
import Styles from "./styles.module.css"

const MenuItem = ({ href, label, children, onClick }) => {
  const router = useRouter();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <li className={router.asPath === href ? Styles.activarMenu : Styles.normalMenu}>
      <Link href={href} onClick={handleClick}>
        {children}
        {label}
      </Link>
    </li>
  );
};

export default MenuItem;
