// import { useNavigate, Link } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavbarComponent(props) {
  const router = useRouter();
  return (
    <div className="navbar">
      <nav className="leftNavbarContainer">
        <div className="navItem" onClick={() => router.push("/")}>
          Home
        </div>
        <div className="navItem" onClick={() => router.push("discover")}>
          Discover
        </div>
        <div className="navItem" onClick={() => router.push("create_project")}>
          Start a project
        </div>
      </nav>
      <div className="centerNavbarContainer">FUNDSHIP</div>
      <div className="rightNavbarContainer">
        <div className="navItem">
          <Link
            href={{
              pathname: "/profile",
              query: { address: props.address },
            }}
          >
            <a>
              {props.address.slice(0, 5) +
                "..." +
                props.address.slice(
                  props.address.length - 4,
                  props.address.length
                )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
