import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Habitantes del Rock',
  description: 'Medio de comunicación independiente dedicado a la cobertura, fotografía y difusión del rock, metal y la cultura alternativa.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Usamos el color de selección rojo (selection:bg-red-600) propio de Habitantes */}
      <body className="bg-[#0a0a0c] text-white min-h-screen flex flex-col font-sans selection:bg-red-600 selection:text-white">
        <Navbar />
        <main className="grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}