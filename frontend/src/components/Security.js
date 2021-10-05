import { Link } from "react-router-dom";
function Security() {
  return (
    <div className="security-info">
      <h1>Security</h1>
      <p>
        This journal app has security measures in place to ensure the safety of
        your data. The technologies involved in this are Bcrypt, which allows
        for your password to be encrypted, making your data more secure. This
        data is then saved to the databse, along with a unique user code that
        the app generates. <br />
        <br /> Each time you attempt to login, the details you input will be
        checked against your existing login credentials and if they are
        identical you will gaim access to your account, otherwise access will be
        denied. When making specific changes within your account such as
        creating an entry your unique code will be used as authorisation to
        allow you to complete this action. If the unique code does not match the
        code saved for that particular user than access will be denied. Each
        time you login, a new unique code will be generated providing extra
        security.{" "}
      </p>
      <button className="home-btn">
        <Link to="/">Back Home</Link>
      </button>
    </div>
  );
}
export default Security;
