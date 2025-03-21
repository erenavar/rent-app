import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/assets/styles/global.css";

export const metadata = {
  title: "Rent Your Home",
  keywords: "rent,real estate,home",
  description: "Find your perfect home",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
