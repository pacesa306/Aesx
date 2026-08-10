import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Heart,
  Home,
  LockKeyhole,
  MapPin,
  Menu,
  Plus,
  RefreshCcw,
  Search,
  SlidersHorizontal,
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

const storeCategories = [
  { name: "HOMBRE", image: "/store-cat-men.png", icon: "shirt" },
  { name: "MUJER", image: "/store-cat-women.png", icon: "top" },
  { name: "POLERAS", image: "/store-cat-polos.png", icon: "hanger" },
  { name: "SHORTS", image: "/store-cat-shorts.png", icon: "shorts" },
  { name: "ACCESORIOS", image: "/store-cat-accessories.png", icon: "bag" },
];

const bestSellers = [
  { name: "Camiseta Dry Fit Elite", price: "Bs. 129", image: "/store-product-tee.png" },
  { name: "Hoodie Performance Pro", price: "Bs. 199", image: "/store-product-hoodie.png" },
  { name: "Pantalón Jogger Training", price: "Bs. 179", image: "/store-product-jogger.png" },
  { name: "Short Sport Active", price: "Bs. 99", image: "/store-product-short.png" },
];

const newProducts = [
  { name: "Training Tee", price: "Bs. 139", image: "/store-new-1.png" },
  { name: "Motion Top", price: "Bs. 149", image: "/store-new-2.png" },
  { name: "Essential Hoodie", price: "Bs. 219", image: "/store-new-3.png" },
  { name: "Run Cap", price: "Bs. 89", image: "/store-new-4.png" },
];

function StorePage({ onAddToCart }: { onAddToCart: () => void }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  const ProductCard = ({ product }: { product: (typeof bestSellers)[number] }) => (
    <article className="store-product-card">
      <div className="store-product-image">
        <img src={product.image} alt="" />
        <button
          type="button"
          className={`store-favorite${favorites.includes(product.name) ? " is-favorite" : ""}`}
          aria-label={`${favorites.includes(product.name) ? "Quitar de" : "Agregar a"} favoritos ${product.name}`}
          onClick={() => toggleFavorite(product.name)}
        >
          <Heart aria-hidden="true" fill={favorites.includes(product.name) ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="store-product-details">
        <h3>{product.name}</h3>
        <strong>{product.price}</strong>
        <button type="button" className="store-add-button" onClick={onAddToCart}>
          AGREGAR <ShoppingCart aria-hidden="true" />
        </button>
      </div>
    </article>
  );

  return (
    <div className="store-page">
      <section className="store-intro" aria-labelledby="store-title">
        <h1 id="store-title">TIENDA</h1>
        <p>Ropa deportiva para cada entrenamiento.</p>
        <div className="store-toolbar">
          <label className="store-search">
            <Search aria-hidden="true" />
            <input type="search" placeholder="Buscar productos..." aria-label="Buscar productos" />
          </label>
          <button type="button" className="store-filter-button">
            <SlidersHorizontal aria-hidden="true" />
            FILTROS
          </button>
        </div>
      </section>

      <section className="store-hero" aria-label="Rendimiento sin límites">
        <img src="/store-hero.png" alt="Atleta usando ropa deportiva Mazeta" />
        <div className="store-hero-overlay" />
        <div className="store-hero-copy">
          <h2>RENDIMIENTO<br />SIN LÍMITES</h2>
          <p>Nueva colección deportiva<br />ya disponible.</p>
          <button type="button" onClick={onAddToCart}>VER COLECCIÓN</button>
        </div>
        <div className="store-dots"><span className="is-active" /><span /><span /></div>
      </section>

      <section className="store-section" aria-labelledby="store-categories-title">
        <div className="store-section-heading">
          <h2 id="store-categories-title">CATEGORÍAS</h2>
          <button type="button">Ver todas <ChevronRight aria-hidden="true" /></button>
        </div>
        <div className="store-category-row">
          {storeCategories.map((category) => (
            <button type="button" className="store-category-card" key={category.name}>
              <img src={category.image} alt="" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="store-section" aria-labelledby="bestsellers-title">
        <div className="store-section-heading">
          <h2 id="bestsellers-title">MÁS VENDIDOS</h2>
          <button type="button">Ver todos <ChevronRight aria-hidden="true" /></button>
        </div>
        <div className="store-product-row">
          {bestSellers.map((product) => <ProductCard key={product.name} product={product} />)}
        </div>
      </section>

      <section className="store-offer" aria-label="Oferta de hoodies">
        <img src="/store-offer-hoodie.png" alt="" />
        <div className="store-offer-shade" />
        <div className="store-offer-copy">
          <h2>20% OFF<br />EN HOODIES</h2>
          <p>Por tiempo limitado.<br />No te lo pierdas.</p>
          <button type="button" onClick={onAddToCart}>VER OFERTAS</button>
        </div>
        <div className="store-discount">20%<br /><span>OFF</span></div>
      </section>

      <section className="store-section store-new-section" aria-labelledby="new-title">
        <div className="store-section-heading">
          <h2 id="new-title">NUEVOS PRODUCTOS</h2>
          <button type="button">Ver todos <ChevronRight aria-hidden="true" /></button>
        </div>
        <div className="store-product-row">
          {newProducts.map((product) => <ProductCard key={product.name} product={product} />)}
        </div>
      </section>
      <div className="store-bottom-space" />
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BottomTab>("tienda");
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
        {activeTab === "tienda" ? <StorePage onAddToCart={() => setCartCount((count) => count + 1)} /> : (
        <>
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
        </>
        )}
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

      {activeTab === "tienda" && (
        <button
          type="button"
          className="store-floating-cart"
          aria-label={`Ver carrito${cartCount > 0 ? `, ${cartCount} productos` : ""}`}
          onClick={() => setActiveTab("tienda")}
        >
          <ShoppingCart aria-hidden="true" />
          <span>{cartCount > 99 ? "99+" : cartCount}</span>
        </button>
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