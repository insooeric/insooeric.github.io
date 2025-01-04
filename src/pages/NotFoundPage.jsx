import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className="not-found-page">
        <div className="content">
          <div className="error-text">404</div>
          <span className="text-emoji">(╯°□°)╯︵ ┻━┻</span>
          <p>
            Hey, this is website.
            <br />
            If you&apos;re seeing this, it&apos;s probably you&apos;re in a
            wrong route; else, my owner <b>Insoo</b> made a serious mistake.
            <br />
            <br />
            I&apos;ll make sure to slap him and let him know.
            <br />
            So, grab some coffee and stay back
            <br />
            <div
              className="back-to-main"
              onClick={handleHomeClick}
              style={{ cursor: "pointer" }}
            >
              ⭐HERE⭐
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
