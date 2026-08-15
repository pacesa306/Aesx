import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Link } from 'wouter';
import { branches } from '@/data/branches';
import { prefetch } from '@/lib/prefetch';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 mb-12 md:mb-20">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-1 font-heading font-black tracking-[0.2em] uppercase text-2xl mb-4">
              <span className="text-white">BOLIVIA</span>
              <span className="gold-gradient-text">FITNESS</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Empresa boliviana especializada en la venta de suplementos y productos deportivos americanos. Las mejores marcas de EE.UU., disponibles en Bolivia.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-4">Sucursales</h4>
            <ul className="flex flex-col gap-2">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <Link
                    href={`/sucursales/${branch.id}`}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                    onMouseEnter={() => prefetch('/sucursales')}
                  >
                    {branch.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-heading font-bold uppercase tracking-wider mb-4">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400 mb-6">
              <p>WhatsApp: <a href="https://wa.me/59175666702" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+591 75666702</a></p>
              <p>Santa Cruz de la Sierra, Bolivia</p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/redes"
                className="text-xs text-gray-500 hover:text-primary transition-colors uppercase tracking-widest"
                onMouseEnter={() => prefetch('/redes')}
              >
                Ver redes por sucursal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Bolivia Fitness. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/redes" aria-label="Redes sociales" className="text-gray-600 hover:text-primary transition-colors">
              <FaInstagram size={20} />
            </Link>
            <Link href="/redes" aria-label="Redes sociales" className="text-gray-600 hover:text-primary transition-colors">
              <FaFacebook size={20} />
            </Link>
            <Link href="/redes" aria-label="Redes sociales" className="text-gray-600 hover:text-primary transition-colors">
              <FaTiktok size={20} />
            </Link>
            <a href="https://wa.me/59175666702" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-600 hover:text-primary transition-colors">
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
