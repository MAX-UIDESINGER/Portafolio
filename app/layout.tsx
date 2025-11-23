import "./globals.css";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { ThemeProvider } from "@/hooks/useTheme";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative overflow-x-hidden overflow-y-auto '>  
        {/* <ThemeProvider defaultTheme="system" storageKey="pool-martin-theme"> */}
          {/* <div className="overflow-hidden relative min-h-screen"> */}
            {/* Gradiente decorativo en la esquina superior izquierda
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-64 -top-64 -z-20 w-[1200px] h-[900px] opacity-40 dark:opacity-40 blur-[160px]"
            >
              <div
                style={{
                  clipPath:
                    'polygon(7.1% 4.1%, 100% 1.6%, 20% 20.9%, 10% 10%, 9.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="w-full h-full bg-gradient-to-tr from-[#ff3b8a] to-[#6d28d9] dark:from-[#ff3b8a] dark:to-[#6d28d9] animate-lava-lamp"
              />
            </div>

            {/* Gradiente decorativo abajo a la derecha */}
            {/* <div
              aria-hidden="true"
              className="absolute right-0 bottom-0 -z-10 w-[900px] h-[600px] opacity-25 dark:opacity-25 blur-[120px] translate-x-1/4"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="w-full h-full bg-gradient-to-tr from-[#ff3b8a] to-[#6d28d9] dark:from-[#ff3b8a] dark:to-[#6d28d9] animate-lava-lamp"
              />
            </div> */} 
            {/* <NavBar /> */}
            {children}
            {/* <Footer /> */}
          {/* </div> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}