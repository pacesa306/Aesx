import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white">
      <h1 className="text-9xl font-heading font-black text-primary mb-4">404</h1>
      <h2 className="text-3xl font-heading font-bold mb-8">Página no encontrada</h2>
      <p className="text-gray-400 mb-8 max-w-md text-center">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link href="/">
        <span className="inline-flex items-center justify-center bg-primary text-black font-bold tracking-wider py-3 px-8 rounded-sm hover:bg-white transition-colors uppercase">
          Volver al Inicio
        </span>
      </Link>
    </div>
  );
}