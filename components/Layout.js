import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

export default function Layout({ children, address }) {
  return (
    <>
      <NavbarComponent address={address} />
      <main>{children}</main>
      <FooterComponent />
    </>
  );
}
