import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  Heart,
  Home,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
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

type Product = {
  name: string;
  price: string;
  image: string;
  detailImage?: string;
  category?: string;
  subtitle?: string;
  badge?: string;
};

const boliviaDepartments = [
  "Chuquisaca",
  "La Paz",
  "Cochabamba",
  "Oruro",
  "Potosí",
  "Tarija",
  "Santa Cruz",
  "Beni",
  "Pando",
];

type OrderFormState = {
  department: string;
  reference: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  order: string;
  message: string;
};

const bestSellers: Product[] = [
  {
    name: "Camiseta Dry Fit Elite",
    price: "Bs. 129",
    image: "/store-product-tee.png",
    detailImage: "/mazeta-category-shirt.png",
    category: "CAMISETAS",
    subtitle: "Negro · Dry Fit Premium",
    badge: "MÁS VENDIDO",
  },
  {
    name: "Hoodie Performance Pro",
    price: "Bs. 199",
    image: "/store-product-hoodie.png",
    detailImage: "/store-product-hoodie.png",
    category: "POLERAS",
    subtitle: "Negro · Performance",
    badge: "MÁS VENDIDO",
  },
  {
    name: "Pantalón Jogger Training",
    price: "Bs. 179",
    image: "/store-product-jogger.png",
    detailImage: "/store-product-jogger.png",
    category: "PANTALONES",
    subtitle: "Negro · Training",
    badge: "MÁS VENDIDO",
  },
  {
    name: "Short Sport Active",
    price: "Bs. 99",
    image: "/store-product-short.png",
    detailImage: "/store-product-short.png",
    category: "SHORTS",
    subtitle: "Negro · Sport Active",
    badge: "MÁS VENDIDO",
  },
];

const newProducts: Product[] = [
  { name: "Training Tee", price: "Bs. 139", image: "/store-new-1.png", category: "CAMISETAS", subtitle: "Negro · Training" },
  { name: "Motion Top", price: "Bs. 149", image: "/store-new-2.png", category: "MUJER", subtitle: "Negro · Motion" },
  { name: "Essential Hoodie", price: "Bs. 219", image: "/store-new-3.png", category: "POLERAS", subtitle: "Negro · Essential" },
  { name: "Run Cap", price: "Bs. 89", image: "/store-new-4.png", category: "ACCESORIOS", subtitle: "Negro · Run" },
];

function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuy,
}: {
  product: Product;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
  onBuy: (quantity: number) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(1);

  return (
    <div className="product-detail-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="product-detail-panel" role="dialog" aria-modal="true" aria-labelledby="product-detail-title">
        <div className="product-detail-media">
          <img src={product.detailImage ?? product.image} alt={product.name} />
          <div className="product-detail-media-shade" />
          <span className="product-detail-badge">☆ &nbsp; {product.badge ?? "NUEVO"}</span>
          <button type="button" className="product-detail-close" aria-label="Cerrar detalle" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
          <button type="button" className="product-detail-arrow product-detail-arrow-left" aria-label="Producto anterior">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="product-detail-arrow product-detail-arrow-right" aria-label="Producto siguiente">
            <ChevronRight aria-hidden="true" />
          </button>
          <div className="product-detail-dots"><span className="is-active" /><span /><span /><span /><span /><span /></div>
        </div>

        <div className="product-detail-content">
          <span className="product-detail-category"><i />{product.category ?? "COLECCIÓN MAZETA"}</span>
          <h2 id="product-detail-title">{product.name}</h2>
          <p className="product-detail-subtitle">{product.subtitle ?? "Negro · Calidad premium"}</p>
          <strong className="product-detail-price">{product.price}</strong>

          <div className="product-detail-divider" />

          <div className="product-detail-options">
            <div>
              <span className="product-detail-label">COLOR</span>
              <div className="product-color-options">
                {["#050505", "#494b4d", "#f4f4f4"].map((color, index) => (
                  <button
                    key={color}
                    type="button"
                    aria-label={`Color ${index + 1}`}
                    className={`product-color-swatch${selectedColor === index ? " is-selected" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(index)}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="product-detail-label">TALLA</span>
              <div className="product-size-options">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={selectedSize === size ? "is-selected" : ""}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-detail-stock-row">
            <div>
              <span className="product-detail-label">CANTIDAD</span>
              <div className="product-quantity">
                <button type="button" aria-label="Reducir cantidad" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus aria-hidden="true" /></button>
                <strong>{quantity}</strong>
                <button type="button" aria-label="Aumentar cantidad" onClick={() => setQuantity((value) => value + 1)}><Plus aria-hidden="true" /></button>
              </div>
            </div>
            <div className="product-detail-availability">
              <span className="product-detail-label">DISPONIBILIDAD</span>
              <p><i />En stock</p>
              <small>Listo para enviar</small>
            </div>
          </div>

          <button type="button" className="product-add-main" onClick={() => {
            onAddToCart(quantity);
            onClose();
          }}>
            <ShoppingCart aria-hidden="true" />
            AÑADIR AL CARRITO
          </button>
          <button type="button" className="product-buy-main" onClick={() => onBuy(quantity)}>
            <ShoppingBag aria-hidden="true" />
            COMPRAR
          </button>
          <button type="button" className="product-whatsapp-button">
            <MessageCircle aria-hidden="true" />
            CONSULTAR POR WHATSAPP
          </button>

          <div className="product-detail-benefits">
            <div><ShieldCheck aria-hidden="true" /><span>PAGO SEGURO<small>Protegemos tus datos</small></span></div>
            <div><Truck aria-hidden="true" /><span>ENVÍOS A TODO<small>Bolivia</small></span></div>
            <div><RefreshCcw aria-hidden="true" /><span>CAMBIOS FÁCILES<small>Sin complicaciones</small></span></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrderFormModal({
  product,
  quantity,
  onClose,
}: {
  product: Product | null;
  quantity: number;
  onClose: () => void;
}) {
  const [form, setForm] = useState<OrderFormState>({
    department: "",
    reference: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    order: product ? `${product.name} · ${quantity} unidad${quantity > 1 ? "es" : ""}` : "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof OrderFormState, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const renderDepartmentFields = () => {
    if (form.department === "Santa Cruz") {
      return (
        <div className="order-form-fields">
          <label>
            NÚMERO DE REFERENCIA
            <input
              required
              value={form.reference}
              onChange={(event) => updateField("reference", event.target.value)}
              placeholder="Ej: Referencia de entrega"
            />
          </label>
          <label>
            PEDIDO
            <textarea
              required
              value={form.order}
              onChange={(event) => updateField("order", event.target.value)}
              placeholder="Escribe tu pedido"
              rows={3}
            />
          </label>
          <label>
            MENSAJE
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Detalles adicionales"
              rows={3}
            />
          </label>
        </div>
      );
    }

    if (form.department) {
      return (
        <div className="order-form-fields">
          <label>
            NOMBRE
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Ej: Juan Pérez"
            />
          </label>
          <label>
            TELÉFONO
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="Ej: 71234567"
            />
          </label>
          <label>
            DIRECCIÓN
            <input
              required
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="Ej: Av. principal, número de casa"
            />
          </label>
          <label>
            CIUDAD
            <input
              required
              value={form.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Ej: La Paz"
            />
          </label>
          <label>
            PEDIDO
            <textarea
              required
              value={form.order}
              onChange={(event) => updateField("order", event.target.value)}
              placeholder="Escribe tu pedido"
              rows={3}
            />
          </label>
          <label>
            MENSAJE
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Detalles adicionales"
              rows={3}
            />
          </label>
        </div>
      );
    }

    return <p className="order-form-hint">Selecciona tu departamento para continuar.</p>;
  };

  return (
    <div className="order-form-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="order-form-panel" role="dialog" aria-modal="true" aria-labelledby="order-form-title">
        <header className="order-form-header">
          <div>
            <span className="order-form-eyebrow">DATOS DEL PEDIDO</span>
            <h2 id="order-form-title">Enviar pedido</h2>
            <p>Completa tus datos para coordinar la entrega en Bolivia.</p>
          </div>
          <button type="button" className="order-form-close" aria-label="Cerrar formulario" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>

        {product && (
          <div className="order-summary">
            <span>PEDIDO SELECCIONADO</span>
            <strong>{product.name}</strong>
            <small>{quantity} unidad{quantity > 1 ? "es" : ""} · {product.price}</small>
          </div>
        )}

        <form onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}>
          <label className="order-department-field">
            DEPARTAMENTO
            <select
              required
              value={form.department}
              onChange={(event) => updateField("department", event.target.value)}
            >
              <option value="">Seleccionar departamento</option>
              {boliviaDepartments.map((department) => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </label>

          {renderDepartmentFields()}

          {submitted && <p className="order-form-success" role="status">Tu pedido está listo para ser enviado.</p>}
          <button type="submit" className="order-submit-button" disabled={submitted}>
            <ShoppingCart aria-hidden="true" />
            {submitted ? "PEDIDO PREPARADO" : "ENVIAR PEDIDO"}
          </button>
        </form>
        <p className="order-form-footer">Tus datos se usarán únicamente para coordinar tu pedido.</p>
      </section>
    </div>
  );
}

function StorePage({
  onAddToCart,
  onOpenProduct,
  onOpenOrder,
}: {
  onAddToCart: () => void;
  onOpenProduct: (product: Product) => void;
  onOpenOrder: () => void;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <article
      className="store-product-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpenProduct(product)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpenProduct(product);
      }}
    >
      <div className="store-product-image">
        <img src={product.image} alt="" />
        <button
          type="button"
          className={`store-favorite${favorites.includes(product.name) ? " is-favorite" : ""}`}
          aria-label={`${favorites.includes(product.name) ? "Quitar de" : "Agregar a"} favoritos ${product.name}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(product.name);
          }}
        >
          <Heart aria-hidden="true" fill={favorites.includes(product.name) ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="store-product-details">
        <h3>{product.name}</h3>
        <strong>{product.price}</strong>
        <button type="button" className="store-add-button" onClick={(event) => {
          event.stopPropagation();
          onAddToCart();
        }}>
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);

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
        {activeTab === "tienda" ? (
          <StorePage
            onAddToCart={() => setCartCount((count) => count + 1)}
            onOpenProduct={setSelectedProduct}
            onOpenOrder={() => {
              setOrderProduct(null);
              setOrderQuantity(cartCount);
              setOrderOpen(true);
            }}
          />
        ) : (
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
              {
                name: "Essential Tee",
                price: "Bs. 149",
                image: "/store-product-tee.png",
                detailImage: "/mazeta-category-shirt.png",
                category: "CAMISETAS",
                subtitle: "Negro · Dry Fit Premium",
                badge: "MÁS VENDIDO",
                tone: "product-black",
              },
              {
                name: "Core Hoodie",
                price: "Bs. 299",
                image: "/store-product-hoodie.png",
                detailImage: "/store-product-hoodie.png",
                category: "POLERAS",
                subtitle: "Negro · Performance",
                badge: "NUEVO",
                tone: "product-stone",
              },
            ].map((product) => (
              <article
                className="mazeta-product-card"
                key={product.name}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProduct(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setSelectedProduct(product);
                }}
              >
                <div className={`mazeta-product-image ${product.tone}`}>
                  <span className="mazeta-product-label">MAZETA</span>
                  <button
                    type="button"
                    aria-label={`Agregar ${product.name} al carrito`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setCartCount((count) => count + 1);
                    }}
                  >
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
          <button
            type="button"
            className="mazeta-cart-button"
            onClick={() => {
              setOrderProduct(null);
              setOrderQuantity(cartCount);
              setOrderOpen(true);
            }}
          >
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
          onClick={() => {
            setOrderProduct(null);
            setOrderQuantity(cartCount);
            setOrderOpen(true);
          }}
        >
          <ShoppingCart aria-hidden="true" />
          <span>{cartCount > 99 ? "99+" : cartCount}</span>
        </button>
      )}

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(quantity) => setCartCount((count) => count + quantity)}
          onBuy={(quantity) => {
            setCartCount((count) => count + quantity);
            setOrderProduct(selectedProduct);
            setOrderQuantity(quantity);
            setOrderOpen(true);
            setSelectedProduct(null);
          }}
        />
      )}

      {orderOpen && (
        <OrderFormModal
          product={orderProduct}
          quantity={orderQuantity}
          onClose={() => {
            setOrderProduct(null);
            setOrderQuantity(0);
            setOrderOpen(false);
          }}
        />
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