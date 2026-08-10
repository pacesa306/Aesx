import { useState } from "react";
import {
  Home,
  Instagram,
  MapPin,
  Menu,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

type NavKey = "inicio" | "sucursales" | "tienda" | "inscribete";

const bottomItems: Array<{
  key: NavKey;
  label: string;
  icon: typeof Home;
}> = [
  { key: "inicio", label: "INICIO", icon: Home },
  { key: "sucursales", label: "SUCURSALES", icon: MapPin },
  { key: "tienda", label: "TIENDA", icon: ShoppingBag },
  { key: "inscribete", label: "INSCRÍBETE", icon: UserRound },
];

const menuItems: Array<{ label: string; key?: NavKey; gift?: boolean }> = [
  { label: "INICIO", key: "inicio" },
  { label: "SUCURSALES", key: "sucursales" },
  { label: "TIENDA", key: "tienda" },
  { label: "REGALOS", gift: true },
  { label: "PROMOCIONES" },
  { label: "¿QUIÉNES SOMOS?" },
  { label: "REDES SOCIALES" },
  { label: "BUZÓN DE SUGERENCIAS" },
  { label: "INSCRÍBETE", key: "inscribete" },
];

export function MazetaMobileHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<NavKey>("inicio");

  const chooseItem = (key?: NavKey) => {
    if (key) setActiveItem(key);
    setIsMenuOpen(false);
  };

  return (
    <main className="mazeta-shell">
      <style>{`
        .mazeta-shell {
          --ink: #f4f4f1;
          --muted: #9a9a96;
          --rule: #383838;
          position: relative;
          width: 100%;
          min-height: 100dvh;
          overflow: hidden;
          background: #090909;
          color: var(--ink);
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          letter-spacing: .035em;
        }
        .mazeta-header {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          padding: 0 22px 0 24px;
          border-bottom: 1px solid var(--rule);
          background: #090909;
        }
        .mazeta-wordmark {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: .16em;
        }
        .mazeta-menu-button {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          margin-right: -8px;
          color: var(--ink);
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .mazeta-menu-button svg { width: 25px; height: 25px; stroke-width: 1.15; }
        .mazeta-void { position: absolute; inset: 70px 0 65px; background: #090909; }
        .mazeta-menu {
          position: absolute;
          z-index: 3;
          inset: 70px 0 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #090909;
          animation: mazeta-reveal .24s ease-out both;
        }
        .mazeta-menu-list {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding: 6px 24px 8px;
          list-style: none;
        }
        .mazeta-menu-item {
          position: relative;
          display: flex;
          min-height: 39px;
          align-items: center;
          justify-content: center;
          color: #efefec;
          border: 0;
          background: transparent;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .145em;
          line-height: 1;
          cursor: pointer;
        }
        .mazeta-menu-item:after {
          position: absolute;
          right: 0;
          bottom: 5px;
          left: 0;
          height: 1px;
          background: transparent;
          content: "";
        }
        .mazeta-menu-item.selected:after { background: #eeeeeb; }
        .mazeta-gift { display: inline-flex; align-items: center; gap: 7px; }
        .mazeta-gift-emoji { font-size: 13px; line-height: 1; }
        .mazeta-bottom-nav {
          position: absolute;
          z-index: 5;
          right: 0;
          bottom: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          height: 65px;
          border-top: 1px solid var(--rule);
          background: #090909;
        }
        .mazeta-nav-item {
          position: relative;
          display: flex;
          min-width: 0;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 7px 2px 4px;
          color: var(--muted);
          border: 0;
          background: transparent;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: .12em;
          cursor: pointer;
          transition: color .18s ease;
        }
        .mazeta-nav-item svg { width: 21px; height: 21px; stroke-width: 1.1; }
        .mazeta-nav-item.active { color: var(--ink); }
        .mazeta-nav-item.active:before {
          position: absolute;
          top: -1px;
          right: 25%;
          left: 25%;
          height: 1px;
          background: #f1f1ee;
          content: "";
        }
        @keyframes mazeta-reveal {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 600px) {
          .mazeta-shell { max-width: 390px; margin: 0 auto; }
        }
      `}</style>

      <header className="mazeta-header">
          <h1 className="mazeta-wordmark">
            <span>MAZETA</span>{" "}
            <span style={{ color: "#979793" }}>BOLIVIA</span>
          </h1>
        <button
          type="button"
          className="mazeta-menu-button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div className="mazeta-void" aria-hidden={!isMenuOpen} />

      {isMenuOpen && (
        <nav className="mazeta-menu" aria-label="Menú principal">
          <div className="mazeta-menu-list">
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.label}
                className={`mazeta-menu-item${item.key === activeItem ? " selected" : ""}`}
                onClick={() => chooseItem(item.key)}
              >
                {item.gift ? (
                  <span className="mazeta-gift">
                    <span className="mazeta-gift-emoji" aria-hidden="true">
                      🎁
                    </span>
                    <span>REGALOS</span>
                  </span>
                ) : (
                  item.label
                )}
              </button>
            ))}
          </div>
        </nav>
      )}

      <nav className="mazeta-bottom-nav" aria-label="Navegación inferior">
        {bottomItems.map(({ key, label, icon: Icon }) => (
          <button
            type="button"
            key={key}
            className={`mazeta-nav-item${activeItem === key ? " active" : ""}`}
            aria-current={activeItem === key ? "page" : undefined}
            onClick={() => chooseItem(key)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}