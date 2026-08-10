import { useEffect, useState } from "react";
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
  Trash2,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

type BottomTab = "inicio" | "tienda" | "inscribete" | "redes" | "whatsapp";

const bottomTabs: Array<{
  id: BottomTab;
  label: string;
  Icon: typeof Home;
}> = [
  { id: "inicio", label: "INICIO", Icon: Home },
  { id: "tienda", label: "TIENDA", Icon: ShoppingBag },
  { id: "inscribete", label: "INSCRÍBETE", Icon: UserRound },
  { id: "whatsapp", label: "WHATSAPP", Icon: MessageCircle },
];

const menuItems = [
  { label: "INICIO", tab: "inicio" as BottomTab | undefined },
  { label: "SUCURSALES" },
  { label: "TIENDA", tab: "tienda" as BottomTab | undefined },
  { label: "REGALOS" },
  { label: "PROMOCIONES" },
  { label: "¿QUIÉNES SOMOS?" },
  { label: "REDES SOCIALES", tab: "redes" as BottomTab | undefined },
  { label: "BUZÓN DE SUGERENCIAS" },
   { label: "WHATSAPP" },
];

const socialLinks = [
  {
    name: "Instagram",
    handle: "@mazeta.bo",
    description: "Novedades, lanzamientos y estilo Mazeta.",
    href: "https://www.instagram.com/mazeta.bo?igsh=cm1waTdqZXlodnF2",
    className: "social-instagram",
    Icon: FaInstagram,
    action: "SEGUIR",
  },
  {
    name: "TikTok",
    handle: "@mazeta.bo",
    description: "Mira nuestros videos y sé parte del movimiento.",
    href: "https://www.tiktok.com/@mazeta.bo?_r=1&_t=ZS-98lFLylS5uX",
    className: "social-tiktok",
    Icon: FaTiktok,
    action: "SEGUIR",
  },
  {
    name: "Facebook",
    handle: "Mazeta Bolivia",
    description: "Comunidad, promociones y toda la actualidad.",
    href: "https://www.facebook.com/share/1PP7t6hznj/",
    className: "social-facebook",
    Icon: FaFacebookF,
    action: "SEGUIR",
  },
  {
    name: "WhatsApp",
    handle: "785 24143",
    description: "Escríbenos para consultar tallas y pedidos.",
    href: "https://wa.me/59178524143",
    className: "social-whatsapp",
    Icon: FaWhatsapp,
    action: "ESCRIBIR",
  },
] as const;

const storeCategories = [
  { name: "HOMBRE", filterCategory: "TODOS", image: "/store-cat-men.png", icon: "shirt" },
  { name: "POLERAS", filterCategory: "POLERAS", image: "/store-cat-polos.png", icon: "hanger" },
  { name: "SHORTS", filterCategory: "SHORTS", image: "/store-cat-shorts.png", icon: "shorts" },
  { name: "JOGGERS", filterCategory: "PANTALONES", image: "/store-product-jogger.png", icon: "pants" },
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

type CartItem = {
  product: Product;
  quantity: number;
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
  {
    name: "Camiseta Alas Nocturnas",
    price: "Bs. 149",
    image: "/mazeta-garment-1.jpg",
    category: "CAMISETAS",
    subtitle: "Negro · Alas Nocturnas",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Alas Rojas",
    price: "Bs. 149",
    image: "/mazeta-garment-2.jpg",
    category: "CAMISETAS",
    subtitle: "Negro · Edición Roja",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Alas Sombra",
    price: "Bs. 149",
    image: "/mazeta-garment-3.jpg",
    category: "CAMISETAS",
    subtitle: "Negro · Shadow Edition",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Alas Plata",
    price: "Bs. 149",
    image: "/mazeta-garment-4.jpg",
    category: "CAMISETAS",
    subtitle: "Negro · Silver Edition",
    badge: "NUEVO",
  },
];

const newProducts: Product[] = [
  { name: "Training Tee", price: "Bs. 139", image: "/store-new-1.png", category: "CAMISETAS", subtitle: "Negro · Training" },
  { name: "Motion Top", price: "Bs. 149", image: "/store-new-2.png", category: "MUJER", subtitle: "Negro · Motion" },
  { name: "Essential Hoodie", price: "Bs. 219", image: "/store-new-3.png", category: "POLERAS", subtitle: "Negro · Essential" },
  { name: "Run Cap", price: "Bs. 89", image: "/store-new-4.png", category: "ACCESORIOS", subtitle: "Negro · Run" },
  {
    name: "Short Calaveras Negro",
    price: "Bs. 119",
    image: "/mazeta-garment-5.jpg",
    category: "SHORTS",
    subtitle: "Negro · Calaveras",
    badge: "NUEVO",
  },
  {
    name: "Short Calaveras Blanco",
    price: "Bs. 119",
    image: "/mazeta-garment-6.jpg",
    category: "SHORTS",
    subtitle: "Blanco · Calaveras",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Mesh Blanca",
    price: "Bs. 139",
    image: "/mazeta-garment-7.jpg",
    category: "POLERAS",
    subtitle: "Blanco · Mesh Lifting",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Mesh Negra",
    price: "Bs. 139",
    image: "/mazeta-garment-8.jpg",
    category: "POLERAS",
    subtitle: "Negro · Mesh Lifting",
    badge: "NUEVO",
  },
  {
    name: "Tank Calaveras",
    price: "Bs. 129",
    image: "/mazeta-garment-9.jpg",
    category: "POLERAS",
    subtitle: "Negro · Tank Training",
    badge: "NUEVO",
  },
  {
    name: "Short Calaveras Edición Roja",
    price: "Bs. 119",
    image: "/mazeta-garment-10.jpg",
    category: "SHORTS",
    subtitle: "Negro · Calaveras Roja",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Alas Roja",
    price: "Bs. 149",
    image: "/mazeta-garment-11.jpg",
    category: "CAMISETAS",
    subtitle: "Negro · Red Wing",
    badge: "NUEVO",
  },
  {
    name: "Camiseta Mesh Blanca Classic",
    price: "Bs. 139",
    image: "/mazeta-garment-12.jpg",
    category: "POLERAS",
    subtitle: "Blanco · Mesh Classic",
    badge: "NUEVO",
  },
  {
    name: "Pantalón Calaveras",
    price: "Bs. 189",
    image: "/mazeta-garment-13.jpg",
    category: "PANTALONES",
    subtitle: "Negro · Calaveras",
    badge: "NUEVO",
  },
  {
    name: "Tank Calaveras Classic",
    price: "Bs. 129",
    image: "/mazeta-garment-14.jpg",
    category: "POLERAS",
    subtitle: "Negro · Classic Tank",
    badge: "NUEVO",
  },
  {
    name: "Pantalón Calaveras Rojo",
    price: "Bs. 189",
    image: "/mazeta-garment-15.jpg",
    category: "PANTALONES",
    subtitle: "Negro · Red Detail",
    badge: "NUEVO",
  },
  {
    name: "Pantalón Calaveras Negro",
    price: "Bs. 189",
    image: "/mazeta-garment-16.jpg",
    category: "PANTALONES",
    subtitle: "Negro · Black Detail",
    badge: "NUEVO",
  },
];

const featuredProducts: Product[] = [
  {
    name: "Camiseta Alas Nocturnas",
    price: "Bs. 149",
    image: "/mazeta-garment-1.jpg",
    category: "CAMISETAS",
    subtitle: "Negro · Alas Nocturnas",
    badge: "NUEVO",
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
    name: "Short Calaveras Negro",
    price: "Bs. 119",
    image: "/mazeta-garment-5.jpg",
    category: "SHORTS",
    subtitle: "Negro · Calaveras",
    badge: "NUEVO",
  },
  {
    name: "Pantalón Calaveras",
    price: "Bs. 189",
    image: "/mazeta-garment-13.jpg",
    category: "PANTALONES",
    subtitle: "Negro · Calaveras",
    badge: "NUEVO",
  },
];

const heroSlides = [
  "/mazeta-hero-instagram-1.jpg",
  "/mazeta-hero-instagram-2.jpg",
  "/mazeta-hero-anuncio-1.jpg",
  "/mazeta-hero-anuncio-2.jpg",
  "/mazeta-hero-anuncio-3.jpg",
  "/mazeta-hero-anuncio-4.jpg",
  "/mazeta-hero-anuncio-5.jpg",
  "/mazeta-hero-drop-1.jpg",
  "/mazeta-hero-drop-2.jpg",
  "/mazeta-hero-drop-3.jpg",
  "/mazeta-hero-drop-4.jpg",
  "/mazeta-hero-drop-5.jpg",
  "/mazeta-hero-drop-6.jpg",
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
          <button
            type="button"
            className="product-whatsapp-button"
            onClick={() => {
              const text = `Hola Mazeta Bolivia, quiero consultar por ${product.name} (${product.price}).`;
              window.open(`https://wa.me/59178524143?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
            }}
          >
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

function CartModal({
  items,
  onClose,
  onQuantityChange,
  onClear,
  onSendOrder,
}: {
  items: CartItem[];
  onClose: () => void;
  onQuantityChange: (productName: string, change: number) => void;
  onClear: () => void;
  onSendOrder: () => void;
}) {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="cart-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header className="cart-panel-header">
          <div className="cart-panel-title">
            <div className="cart-panel-icon"><ShoppingCart aria-hidden="true" /></div>
            <h2 id="cart-title">MI PEDIDO</h2>
            <span>{totalQuantity}</span>
          </div>
          <button type="button" className="cart-panel-close" aria-label="Cerrar carrito" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart aria-hidden="true" />
              <strong>Tu pedido está vacío</strong>
              <p>Agrega productos para verlos aquí.</p>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.name}>
                <div className="cart-item-image">
                  <img src={product.image} alt="" />
                </div>
                <div className="cart-item-info">
                  <h3 title={product.name}>{product.name}</h3>
                  <strong>{product.price}</strong>
                  <div className="cart-item-quantity" aria-label={`Cantidad de ${product.name}`}>
                    <button
                      type="button"
                      aria-label={`Reducir ${product.name}`}
                      onClick={() => onQuantityChange(product.name, -1)}
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <b>{quantity}</b>
                    <button
                      type="button"
                      aria-label={`Aumentar ${product.name}`}
                      onClick={() => onQuantityChange(product.name, 1)}
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="cart-item-remove"
                  aria-label={`Eliminar ${product.name}`}
                  onClick={() => onQuantityChange(product.name, -quantity)}
                >
                  <Trash2 aria-hidden="true" />
                </button>
              </article>
            ))
          )}
        </div>

        <footer className="cart-panel-footer">
          <div className="cart-panel-summary">
            <strong>{totalQuantity} PRODUCTO{totalQuantity === 1 ? "" : "S"}</strong>
            <button type="button" onClick={onClear} disabled={items.length === 0}>VACIAR</button>
          </div>
          <button
            type="button"
            className="cart-send-button"
            onClick={onSendOrder}
            disabled={items.length === 0}
          >
            <MessageCircle aria-hidden="true" />
            ENVIAR PEDIDO
          </button>
          <p>Te contactaremos para confirmar disponibilidad y entrega.</p>
        </footer>
      </section>
    </div>
  );
}

function OrderFormModal({
  items,
  onClose,
}: {
  items: CartItem[];
  onClose: () => void;
}) {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const orderText = items
    .map(({ product, quantity }) => `${product.name} · ${quantity} unidad${quantity > 1 ? "es" : ""}`)
    .join("\n");
  const [form, setForm] = useState<OrderFormState>({
    department: "",
    reference: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    order: orderText,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof OrderFormState, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const sendOrderToWhatsApp = () => {
    const lines = [
      "Hola Mazeta Bolivia, quiero realizar este pedido:",
      "",
      form.order,
      "",
      `Departamento: ${form.department}`,
      ...(form.department === "Santa Cruz"
        ? [`Referencia: ${form.reference}`]
        : [
            `Nombre: ${form.name}`,
            `Teléfono: ${form.phone}`,
            `Dirección: ${form.address}`,
            `Ciudad: ${form.city}`,
          ]),
      ...(form.message ? ["", `Mensaje: ${form.message}`] : []),
    ];

    window.open(
      `https://wa.me/59178524143?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSubmitted(true);
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

        {items.length > 0 && (
          <div className="order-summary">
            <span>PEDIDO SELECCIONADO</span>
            {items.map(({ product, quantity }) => (
              <strong key={product.name}>{product.name} · {quantity} unidad{quantity > 1 ? "es" : ""}</strong>
            ))}
            <small>{totalQuantity} producto{totalQuantity > 1 ? "s" : ""} en total</small>
          </div>
        )}

        <form onSubmit={(event) => {
          event.preventDefault();
          sendOrderToWhatsApp();
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
  onOpenCart,
}: {
  onAddToCart: (product: Product, quantity?: number) => void;
  onOpenProduct: (product: Product) => void;
  onOpenCart: () => void;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("TODOS");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFavorite = (name: string) => {
    setFavorites((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
  };

  const allProducts = [...bestSellers, ...newProducts];
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase();
  const matchesProduct = (product: Product) => {
    const matchesCategory = activeCategory === "TODOS" || product.category === activeCategory;
    const matchesSearch =
      !normalizedSearch ||
      [product.name, product.category, product.subtitle]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase().includes(normalizedSearch));
    return matchesCategory && matchesSearch;
  };
  const filteredBestSellers = bestSellers.filter(matchesProduct);
  const filteredNewProducts = newProducts.filter(matchesProduct);
  const filteredProducts = allProducts.filter(matchesProduct);
  const hasActiveFilter = activeCategory !== "TODOS" || Boolean(normalizedSearch);

  const scrollToProducts = () => {
    window.setTimeout(() => {
      document.getElementById("bestsellers-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    setFiltersOpen(false);
    scrollToProducts();
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
           onAddToCart(product);
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
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
            />
          </label>
          <button
            type="button"
            className={`store-filter-button${filtersOpen ? " is-active" : ""}`}
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((open) => !open)}
          >
            <SlidersHorizontal aria-hidden="true" />
            FILTROS
          </button>
        </div>
        {filtersOpen && (
          <div className="store-filter-menu" aria-label="Filtrar por categoría">
            {["TODOS", ...Array.from(new Set(allProducts.map((product) => product.category).filter(Boolean) as string[]))].map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? "is-active" : ""}
                onClick={() => chooseCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="store-hero" aria-label="Rendimiento sin límites">
        <img src="/store-hero.png" alt="Atleta usando ropa deportiva Mazeta" />
        <div className="store-hero-overlay" />
        <div className="store-hero-copy">
          <h2>RENDIMIENTO<br />SIN LÍMITES</h2>
          <p>Nueva colección deportiva<br />ya disponible.</p>
          <button type="button" onClick={scrollToProducts}>VER COLECCIÓN</button>
        </div>
        <div className="store-dots"><span className="is-active" /><span /><span /></div>
      </section>

      <section className="store-section" aria-labelledby="store-categories-title">
        <div className="store-section-heading">
          <h2 id="store-categories-title">CATEGORÍAS</h2>
           <button type="button" onClick={() => chooseCategory("TODOS")}>Ver todas <ChevronRight aria-hidden="true" /></button>
        </div>
        <div className="store-category-row">
          {storeCategories.map((category) => (
             <button
               type="button"
               className={`store-category-card${activeCategory === category.filterCategory ? " is-active" : ""}`}
               key={category.name}
               onClick={() => chooseCategory(category.filterCategory)}
             >
              <img src={category.image} alt="" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="store-section" aria-labelledby="bestsellers-title">
        <div className="store-section-heading">
          <h2 id="bestsellers-title">{hasActiveFilter ? "RESULTADOS" : "MÁS VENDIDOS"}</h2>
          <button type="button" onClick={() => chooseCategory("TODOS")}>Ver todos <ChevronRight aria-hidden="true" /></button>
        </div>
        {hasActiveFilter ? (
          filteredProducts.length > 0 ? (
            <div className="store-product-row">
              {filteredProducts.map((product) => <ProductCard key={product.name} product={product} />)}
            </div>
          ) : (
            <p className="store-no-results">No encontramos productos con esa búsqueda.</p>
          )
        ) : (
          <div className="store-product-row">
            {filteredBestSellers.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
        )}
      </section>

      <section className="store-offer" aria-label="Oferta de hoodies">
        <img src="/store-offer-hoodie.png" alt="" />
        <div className="store-offer-shade" />
        <div className="store-offer-copy">
          <h2>20% OFF<br />EN HOODIES</h2>
          <p>Por tiempo limitado.<br />No te lo pierdas.</p>
          <button type="button" onClick={() => chooseCategory("POLERAS")}>VER OFERTAS</button>
        </div>
        <div className="store-discount">20%<br /><span>OFF</span></div>
      </section>

      <section className="store-section store-new-section" aria-labelledby="new-title">
        <div className="store-section-heading">
          <h2 id="new-title">NUEVOS PRODUCTOS</h2>
          <button type="button" onClick={() => chooseCategory("TODOS")}>Ver todos <ChevronRight aria-hidden="true" /></button>
        </div>
        {!hasActiveFilter && (
          <div className="store-product-row">
            {filteredNewProducts.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
        )}
      </section>
      <div className="store-bottom-space" />
    </div>
  );
}

function SocialPage() {
  return (
    <div className="social-page">
      <section className="social-intro" aria-labelledby="social-title">
        <span className="social-eyebrow">CONECTA CON MAZETA</span>
        <h1 id="social-title">REDES SOCIALES</h1>
        <p>Sigue nuestra comunidad y no te pierdas ningún lanzamiento.</p>
      </section>

      <section className="social-highlight" aria-label="Comunidad Mazeta Bolivia">
        <div className="social-highlight-mark"><span>M</span></div>
        <div>
          <span className="social-highlight-kicker">MAZETA BOLIVIA</span>
          <h2>VISTE TU ACTITUD</h2>
          <p>Comparte tu estilo, descubre nuevos drops y forma parte del equipo.</p>
        </div>
        <span className="social-highlight-line" aria-hidden="true" />
      </section>

      <section className="social-grid" aria-label="Perfiles sociales">
        {socialLinks.map(({ name, handle, description, href, className, Icon, action }) => (
          <article className={`social-card ${className}`} key={name}>
            <div className="social-card-top">
              <div className="social-icon" aria-hidden="true"><Icon /></div>
              <span className="social-card-spark" aria-hidden="true">+</span>
            </div>
            <div className="social-card-copy">
              <h2>{name}</h2>
              <strong>{handle}</strong>
              <p>{description}</p>
            </div>
            <a href={href} target="_blank" rel="noreferrer">
              {action}
              <ArrowRight aria-hidden="true" />
            </a>
          </article>
        ))}
      </section>

      <p className="social-footer-note">#MAZETABOLIVIA · COMPARTE TU ESTILO</p>
      <div className="social-bottom-space" />
    </div>
  );
}

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<BottomTab>("inicio");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [announcementPaused, setAnnouncementPaused] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((slide) => (slide + 1) % heroSlides.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  const selectTab = (tab: BottomTab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.name === product.name);
      if (existing) {
        return current.map((item) =>
          item.product.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { product, quantity }];
    });
  };

  const changeCartQuantity = (productName: string, change: number) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.product.name === productName
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <main className="mazeta-app">
      <button
        type="button"
        className={`mazeta-announcement-bar${announcementPaused ? " is-paused" : ""}`}
        aria-label={announcementPaused ? "Reanudar anuncio" : "Pausar anuncio"}
        aria-pressed={announcementPaused}
        onClick={() => setAnnouncementPaused((paused) => !paused)}
      >
        <span className="mazeta-announcement-viewport" aria-hidden="true">
          <span className="mazeta-announcement-track">
            <span className="mazeta-announcement-message">
              <b>MAZETA WORLD <em>ONLINE</em></b>
              <i />
              <strong>ENVÍOS A TODA BOLIVIA</strong>
              <span className="mazeta-announcement-flag">🇧🇴</span>
              <i />
              <b>NUEVA COLECCIÓN DISPONIBLE</b>
              <i />
            </span>
            <span className="mazeta-announcement-message" aria-hidden="true">
              <b>MAZETA WORLD <em>ONLINE</em></b>
              <i />
              <strong>ENVÍOS A TODA BOLIVIA</strong>
              <span className="mazeta-announcement-flag">🇧🇴</span>
              <i />
              <b>NUEVA COLECCIÓN DISPONIBLE</b>
              <i />
            </span>
          </span>
        </span>
      </button>
      <header className="mazeta-header">
        <button
          className="mazeta-wordmark"
          type="button"
          aria-label="Inicio"
          onClick={() => selectTab("inicio")}
        >
          <span>MAZETA</span> <strong>BOLIVIA 🇧🇴 . COM</strong>
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
            onAddToCart={(product, quantity) => {
              addToCart(product, quantity);
              setCartOpen(true);
            }}
            onOpenProduct={setSelectedProduct}
            onOpenCart={() => setCartOpen(true)}
          />
        ) : activeTab === "redes" ? (
          <SocialPage />
        ) : (
        <div className="mazeta-home-content">
        <section className="mazeta-hero" aria-label="Nueva colección">
          <div className="mazeta-hero-slides" aria-hidden="true">
            {heroSlides.map((image, index) => (
              <img
                className={`mazeta-hero-image${activeHeroSlide === index ? " is-active" : ""}`}
                key={image}
                src={image}
                alt=""
              />
            ))}
          </div>
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
            {heroSlides.map((image, index) => (
              <button
                type="button"
                className={activeHeroSlide === index ? "is-active" : ""}
                key={image}
                aria-label={`Ver imagen ${index + 1}`}
                onClick={() => setActiveHeroSlide(index)}
              />
            ))}
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

        <section className="mazeta-section mazeta-about" aria-labelledby="about-title">
          <div className="mazeta-section-heading">
            <div>
              <span className="mazeta-section-kicker">CONOCE NUESTRA HISTORIA</span>
              <h2 id="about-title">¿Quiénes somos?</h2>
            </div>
          </div>
          <div className="mazeta-about-card">
            <div className="mazeta-about-image">
              <img src="/mazeta-hero-model.png" alt="Modelo usando ropa Mazeta Bolivia" />
              <span>DESDE<br />BOLIVIA</span>
            </div>
            <div className="mazeta-about-copy">
              <span className="mazeta-about-mark">MZ / BOLIVIA</span>
              <h3>Ropa que representa tu forma de vivir.</h3>
              <p>
                Somos una empresa de ropa deportiva con los mejores diseños para acompañar tus
                entrenamientos con estilo y moda.
              </p>
              <button type="button" className="mazeta-primary-button" onClick={() => setActiveTab("tienda")}>
                CONOCE LA COLECCIÓN
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
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
            {featuredProducts.map((product) => (
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
                <div className="mazeta-product-image">
                  <img src={product.image} alt="" />
                  <span className="mazeta-product-label">{product.badge ?? "MAZETA"}</span>
                  <button
                    type="button"
                    aria-label={`Agregar ${product.name} al carrito`}
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                      setCartOpen(true);
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
             setCartOpen(true);
            }}
          >
            VER CARRITO
            {cartCount > 0 && <b>{cartCount}</b>}
            <ChevronRight aria-hidden="true" />
          </button>
        </section>
        <div className="mazeta-mobile-spacer" />
        </div>
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
                    if (item.tab) {
                      selectTab(item.tab);
                    } else if (item.label === "WHATSAPP") {
                      window.open("https://wa.me/59178524143", "_blank", "noopener,noreferrer");
                      setMenuOpen(false);
                    } else {
                      setMenuOpen(false);
                    }
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
             setCartOpen(true);
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
          onAddToCart={(quantity) => {
            addToCart(selectedProduct, quantity);
            setCartOpen(true);
          }}
          onBuy={(quantity) => {
            addToCart(selectedProduct, quantity);
            setSelectedProduct(null);
            setCartOpen(true);
          }}
        />
      )}
      {cartOpen && (
        <CartModal
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onQuantityChange={changeCartQuantity}
          onClear={() => setCartItems([])}
          onSendOrder={() => {
            setCartOpen(false);
            setOrderOpen(true);
          }}
        />
      )}
      {orderOpen && (
        <OrderFormModal
          items={cartItems}
          onClose={() => {
            setOrderOpen(false);
          }}
        />
      )}
      <nav className="mazeta-bottom-nav" aria-label="Navegación inferior">
        {bottomTabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`mazeta-bottom-tab${activeTab === id ? " is-active" : ""}${id === "whatsapp" ? " is-whatsapp" : ""}`}
            aria-current={activeTab === id ? "page" : undefined}
            onClick={() => {
              if (id === "whatsapp") {
                window.open("https://wa.me/59178524143", "_blank", "noopener,noreferrer");
                return;
              }
              selectTab(id);
            }}
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