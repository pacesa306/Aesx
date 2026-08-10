import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Home,
  LockKeyhole,
  MapPin,
  Menu,
  Plus,
  RefreshCcw,
  ShoppingBag,
  ShoppingCart,
  Truck,
  UserRoundPlus,
  X,
} from "lucide-react";

type BottomTab = "inicio" | "sucursales" | "tienda" | "inscribete";

const bottomTabs: Array<{
  id: BottomTab;
  label: string;
  Icon: typeof Home;
}> = [
  { id: "inicio", label: "INICIO", Icon: Home },
  { id: "sucursales", label: "SUCURSALES", Icon: MapPin },
  { id: "tienda", label: "TIENDA", Icon: ShoppingBag },
  { id: "inscribete", label: "INSCRÍBETE", Icon: UserRoundPlus },
];

const menuItems = [
  { label: "INICIO", tab: "inicio" as BottomTab | undefined },
  { label: "SUCURSALES", tab: "sucursales" as BottomTab | undefined },
  { label: "TIENDA", tab: "tienda" as BottomTab | undefined },
  { label: "REGALOS" },
  { label: "PROMOCIONES" },
  { label: "¿QUIÉNES SOMOS?" },
  { label: "REDES SOCIALES" },
  { label: "BUZÓN DE SUGERENCIAS" },
  { label: "INSCRÍBETE", tab: "inscribete" as BottomTab | undefined },
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BottomTab>("inicio");
  const [cartCount, setCartCount] = useState(0);

  const selectTab = (tab: BottomTab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  return (
    <main className="mazeta-app">
      <header className="mazeta-header">
        <button
          className="mazeta-wordmark"
          type="button"
          aria-label="Inicio"
          onClick={() => selectTab("inicio")}
        >
          <span>MAZETA</span> <strong>BOLIVIA</strong>
        </button>

        <button
          className="mazeta-menu-button"
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <div className={`mazeta-page${menuOpen ? " is-covered" : ""}`}>
        <section className="mazeta-hero" aria-label="Nueva colección">
          <img
            className="mazeta-hero-image"
            src="/mazeta-hero-model.png"
            alt="Modelo con gorra y sudadera de Mazeta Bolivia"
          />
          <div className="mazeta-hero-shade" />
          <div className="mazeta-hero-copy">
            <span className="mazeta-eyebrow">NUEVA COLECCIÓN</span>
            <span className="mazeta-eyebrow-line" />
            <h1>ESTILO QUE<br />TE DEFINE</h1>
            <p>Ropa urbana de alta calidad<br />para quienes marcan la diferencia.</p>
            <button className="mazeta-primary-button" type="button" onClick={() => setActiveTab("tienda")}>
              VER COLECCIÓN
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <div className="mazeta-slider-dots" aria-label="Slide actual">
            <span className="is-active" />
            <span />
            <span />
          </div>
        </section>

        <section className="mazeta-benefits" aria-label="Beneficios de compra">
          {[
            { Icon: Truck, title: "ENVÍOS A TODO BOLIVIA", body: "Rápidos y seguros" },
            { Icon: BadgeCheck, title: "CALIDAD PREMIUM", body: "Materiales seleccionados" },
            { Icon: LockKeyhole, title: "COMPRA SEGURA", body: "Protegemos tus datos" },
            { Icon: RefreshCcw, title: "CAMBIOS FÁCILES", body: "Sin complicaciones" },
          ].map(({ Icon, title, body }) => (
            <div className="mazeta-benefit" key={title}>
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <span>{body}</span>
            </div>
          ))}
        </section>

        <section className="mazeta-section mazeta-categories" aria-labelledby="categories-title">
          <div className="mazeta-section-heading">
            <div>
              <span className="mazeta-section-kicker">DESCUBRE TU ESTILO</span>
              <h2 id="categories-title">Categorías</h2>
            </div>
            <button type="button" className="mazeta-text-button" onClick={() => setActiveTab("tienda")}>
              VER TODO <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="mazeta-category-grid">
            {[
              { name: "Camisetas", imagePosition: "category-shirt" },
              { name: "Hoodies", imagePosition: "category-hoodie" },
              { name: "Pantalones", imagePosition: "category-pants" },
              { name: "Accesorios", imagePosition: "category-cap" },
            ].map(({ name, imagePosition }) => (
              <button type="button" className={`mazeta-category-card ${imagePosition}`} key={name} onClick={() => setActiveTab("tienda")}>
                <span>{name}</span>
                <ChevronRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>

        <section className="mazeta-collection-banner" aria-label="Nueva colección destacada">
          <div className="mazeta-banner-icon"><ShoppingBag aria-hidden="true" /></div>
          <div>
            <span>NUEVA COLECCIÓN</span>
            <p>Descubre lo último en moda urbana.</p>
          </div>
          <button type="button" aria-label="Ver nueva colección" onClick={() => setActiveTab("tienda")}>
            <ArrowRight aria-hidden="true" />
          </button>
        </section>

        <section className="mazeta-section mazeta-products" aria-labelledby="products-title">
          <div className="mazeta-section-heading">
            <div>
              <span className="mazeta-section-kicker">LO MÁS BUSCADO</span>
              <h2 id="products-title">Favoritos</h2>
            </div>
            <button type="button" className="mazeta-text-button" onClick={() => setActiveTab("tienda")}>
              TIENDA <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="mazeta-product-row">
            {[
              { name: "Essential Tee", price: "Bs. 149", tone: "product-black" },
              { name: "Core Hoodie", price: "Bs. 299", tone: "product-stone" },
            ].map((product) => (
              <article className="mazeta-product-card" key={product.name}>
                <div className={`mazeta-product-image ${product.tone}`}>
                  <span className="mazeta-product-label">MAZETA</span>
                  <button type="button" aria-label={`Agregar ${product.name} al carrito`} onClick={() => setCartCount((count) => count + 1)}>
                    <Plus aria-hidden="true" />
                  </button>
                </div>
                <div className="mazeta-product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <span>{product.price}</span>
                  </div>
                  <ShoppingCart aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mazeta-cart-card" aria-label="Carrito">
          <div className="mazeta-cart-heading">
            <div className="mazeta-cart-icon"><ShoppingCart aria-hidden="true" /></div>
            <div>
              <span>MI CARRITO</span>
              <p>{cartCount === 0 ? "Tu selección aparecerá aquí." : `${cartCount} producto${cartCount > 1 ? "s" : ""} agregado${cartCount > 1 ? "s" : ""}.`}</p>
            </div>
          </div>
          <button type="button" className="mazeta-cart-button" onClick={() => setActiveTab("tienda")}>
            VER CARRITO
            {cartCount > 0 && <b>{cartCount}</b>}
            <ChevronRight aria-hidden="true" />
          </button>
        </section>
        <div className="mazeta-mobile-spacer" />
      </div>

      {menuOpen && (
        <nav className="mazeta-menu" aria-label="Menú principal">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={item.tab === activeTab ? "is-active" : ""}
                  onClick={() => {
                    if (item.tab) selectTab(item.tab);
                    else setMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <nav className="mazeta-bottom-nav" aria-label="Navegación inferior">
        {bottomTabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`mazeta-bottom-tab${activeTab === id ? " is-active" : ""}`}
            aria-current={activeTab === id ? "page" : undefined}
            onClick={() => selectTab(id)}
          >
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}

export default HomePage;