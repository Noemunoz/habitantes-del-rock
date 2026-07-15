import "./globals.css";
// 1. IMPORTAMOS LOS COMPONENTES
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// AQUÍ ESTÁ LA MAGIA DEL SEO. Next.js inyectará esto automáticamente.
export const metadata = {
  title: "Habitantes del Rock",
  description: "Medio de comunicación independiente dedicado a la cobertura, fotografía y difusión del rock, metal y la cultura alternativa.",
  openGraph: {
    title: "Habitantes del Rock",
    description: "Medio independiente dedicado a la cobertura, fotografía y difusión del rock.",
    url: "https://habitantesdelrock.com",
    siteName: "Habitantes del Rock",
    images: [
      {
        url: "https://i.postimg.cc/Vv1yFXNj/Logo-HR-Blanco-sin-letras.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habitantes del Rock",
    description: "Medio independiente dedicado a la cobertura y difusión del rock.",
    images: ["https://i.postimg.cc/Vv1yFXNj/Logo-HR-Blanco-sin-letras.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col antialiased bg-[#0f0f12] text-white">
        
        {/* 2. COLOCAMOS EL NAVBAR HASTA ARRIBA */}
        <Navbar />
        
        {/* Aquí va el contenido de cada página (Inicio, Nota, Admin, etc.) */}
        <main className="grow w-full">
          {children}
        </main>

        {/* 3. COLOCAMOS EL FOOTER HASTA ABAJO */}
        <Footer />
        
      </body>
    </html>
  );
}