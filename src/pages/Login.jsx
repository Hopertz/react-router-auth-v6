import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/authProvider"

export function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
      let username = formData.get("email");
      let password = formData.get("password");

    auth.signin(username, password, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
          Email: <input name="email" type="text" />
    
          Password: <input name="password" type="text" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
