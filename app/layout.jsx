import Navbar from "@/components/Navbar";
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
      </body>
    </html>
  );
};

export default MainLayout;
