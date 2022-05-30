import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaLink,
  FaPaperPlane,
} from "react-icons/fa";
//import { FaLink } from "react-icons/fi";

export default function FooterComponent(props) {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="trademarkSection">Fundship © 2022</div>
        <div className="externalLinks">
          <div className="linkWrapper">
            <div className="icon">
              <div className="linkedin-icon-bg">
                <a
                  href="mailto:abhishekranjan622@outlook.com"
                  className="linkedin-icon"
                  rel="noreferrer"
                >
                  <FaPaperPlane />
                </a>
              </div>
            </div>
            <div className="icon">
              <a
                href="https://twitter.com/jarryingnut"
                className="twitter-icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
            <div className="icon">
              <a
                href="https://github.com/jarryingnut"
                className="github-icon"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
            </div>
            <div className="icon">
              <div className="linkedin-icon-bg">
                <a
                  href="https://linkedin.com/in/jarryingnut/"
                  className="linkedin-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
            <div className="icon">
              <div className="linkedin-icon-bg">
                <a
                  href="https://jarryingnut.vercel.app"
                  className="linkedin-icon"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLink />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
