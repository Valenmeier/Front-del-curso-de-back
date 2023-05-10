import Styles from "./Header.module.css";
import MenuItem from "./menuItem/menuItem";
import { FaHome } from "react-icons/fa";
import { BsBagHeartFill, BsFillChatDotsFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { RiMoneyDollarCircleFill, RiLoginBoxFill } from "react-icons/ri";
import Image from "next/image";

const Header = ({ isLoggedIn, isAdmin, setMenuOpen, menuOpen }) => {

  let openCloseMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <>
      <header className={Styles.headerGeneral}>
        <div className={Styles.headerMovil}>
          <div className={Styles.encabezado}>
            <div className={Styles.imagenEncabezado}>
              <Image
                src="/images/logoSinFondo.png"
                fill
                sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                priority="true"
                alt="logoTitulo"
              />
            </div>
            <h3>
              Meier <br />
              Commerce
            </h3>
            <div className={Styles.openCloseMenu} onClick={openCloseMenu}>
              <div className={menuOpen ? Styles.barTranslateTop : ""}></div>
              <div className={menuOpen ? Styles.barTranslateMid : ""}></div>
              <div className={menuOpen ? Styles.barTranslateBot : ""}></div>
            </div>
            <div className={Styles.desktop}>
              <ul>
                {isAdmin && (
                  <MenuItem href="/admin" label="Estadisticas">
                    <RiMoneyDollarCircleFill />
                  </MenuItem>
                )}
                <MenuItem href="/" label="Inicio">
                  <FaHome />
                </MenuItem>
                <MenuItem href="/products" label="Productos">
                  <BsBagHeartFill />
                </MenuItem>
                <MenuItem href="/chat" label="Chat">
                  <BsFillChatDotsFill />
                </MenuItem>
                {isLoggedIn ? (
                  <MenuItem href="/logout" label="Cerrar sesión">
                    <BiLogOut />
                  </MenuItem>
                ) : (
                  <MenuItem href="/login" label="Iniciar sesión">
                    <RiLoginBoxFill />
                  </MenuItem>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      <nav
        className={`${Styles.headerNavbar} ${
          menuOpen ? Styles.openMenu : Styles.closeMenu
        }`}
      >
        <ul>
          {isAdmin && (
            <MenuItem
              href="/admin"
              onClick={openCloseMenu}
              label="Estadisticas"
            >
              <RiMoneyDollarCircleFill />
            </MenuItem>
          )}
          <MenuItem href="/" onClick={openCloseMenu} label="Inicio">
            <FaHome />
          </MenuItem>
          <MenuItem href="/products" onClick={openCloseMenu} label="Productos">
            <BsBagHeartFill />
          </MenuItem>
          <MenuItem href="/chat" onClick={openCloseMenu} label="Chat">
            <BsFillChatDotsFill />
          </MenuItem>
          {isLoggedIn ? (
            <MenuItem
              href="/logout"
              onClick={openCloseMenu}
              label="Cerrar sesión"
            >
              <BiLogOut />
            </MenuItem>
          ) : (
            <MenuItem
              href="/login"
              onClick={openCloseMenu}
              label="Iniciar sesión"
            >
              <RiLoginBoxFill />
            </MenuItem>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
