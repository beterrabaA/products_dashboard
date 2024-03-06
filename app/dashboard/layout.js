import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Product Dashboard",
  description: "App to manage products.",
};

export default function DashLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="bottom-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
