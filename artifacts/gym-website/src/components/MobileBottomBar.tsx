import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Home, MapPin, ShoppingBag, UserPlus } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const iconGlow = 'drop-shadow(0 0 5px rgba(255,40,40,1)) drop-shadow(0 0 14px rgba(220,38,38,0.95))';

const items = [
  { href: '/',            icon: Home,       label: 'Inicio'      },
  { href: '/sucursales',  icon: MapPin,     label: 'Sucursales'  },
  { href: '/suplementos', icon: ShoppingBag, label: 'Tienda'      },
  { href: '/inscripcion', icon: UserPlus,   label: 'Inscríbete'  },
];

export default function MobileBottomBar() {
  const [location] = useLocation();

  return (
    <nav className="mobile-bottom-bar md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-primary/70"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch">
        {items.map(({ href, icon: Icon, label }, index) => {
          const active = location === href;
          return (
            <Link
              key={href}
              href={href}
              className={`mobile-bottom-item mobile-bottom-item-${index} flex-1 flex flex-col items-center justify-center py-2.5 gap-1 relative ${active ? 'mobile-bottom-item-active' : ''}`}
            >
              <motion.div
                layoutId={active ? "bottombar-active" : undefined}
                className="absolute top-0 left-2 right-2 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(220,38,38,0.95),0_0_18px_rgba(255,30,30,0.85)]"
              />
              <motion.div
                animate={{ scale: [1, 1.28, 1, 1.18, 1] }}
                transition={{ duration: 0.75, repeat: Infinity, repeatDelay: 0, ease: 'easeInOut' }}
              >
                <Icon size={21} className="mobile-bottom-icon text-primary" style={{ filter: iconGlow }} />
              </motion.div>
              <span className="mobile-bottom-label text-[10px] font-bold uppercase tracking-wider text-primary"
                style={{ textShadow: active ? '0 0 8px rgba(255,30,30,1), 0 0 18px rgba(220,38,38,0.85)' : '0 0 7px rgba(220,38,38,0.8)' }}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/59175666702"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-bottom-item mobile-bottom-item-4 flex-1 flex flex-col items-center justify-center py-2.5 gap-1"
        >
          <motion.div
            animate={{ scale: [1, 1.28, 1, 1.18, 1] }}
            transition={{ duration: 0.75, repeat: Infinity, repeatDelay: 0, ease: 'easeInOut' }}
          >
            <FaWhatsapp size={21} className="mobile-bottom-icon text-primary" style={{ filter: iconGlow }} />
          </motion.div>
          <span className="mobile-bottom-label text-[10px] font-bold uppercase tracking-wider text-primary" style={{ textShadow: '0 0 7px rgba(220,38,38,0.8)' }}>
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
}
