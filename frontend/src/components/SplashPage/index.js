import { useHistory } from "react-router-dom";
import './SplashPage.css';

export default function SplashPage() {
  const user = useSelector((state) => state.session.user);
  if (user) return <Redirect to="/allspots" />;

  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/allspots");
  };

  return (
    <div className="splash-main">
      <div className="splash-main-container">
        <div className="splash-left">
          <div className="get-start-box">
            <p className="words">Find Places to stay on Pairbnb</p>
            <button onClick={handleClick} className="splash-start-btn">
              <div className="get-start-btn">Get Started</div>
            </button>
            <div className="connect-wrapper">
              Connect With Developer
              <div className="icon-links">
                <a
                  href="https://github.com/reneeluo7/Renmo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/rongrong-luo-renee"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="splash-right">
            <img src="https://a0.muscache.com/im/pictures/09efb5fc-7bf1-44c0-b0ef-241a38533e67.jpg?im_w=1680" />
        </div>
      </div>
    </div>
  );
}
