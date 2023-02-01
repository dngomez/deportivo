import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth/AuthProvider";

export default function Login() {
  let navigate = useNavigate()
  let location = useLocation()
  let auth = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname ?? "/";

  function handleSubmit() {
    setLoading(true)
    auth.login(email, password)
      .then(isLogged => {
        if (isLogged) {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.)
          navigate(from, { replace: true })
        } else {
          console.log(JSON.stringify({ severity: 'error', summary: 'Login Error', detail: 'Wrong credentials' }))
        }
        setLoading(false)
      })
  }

  function goHome() {
    navigate("/")
  }

  return (
    <div className="login">
      <div className="box">
        <div className="title">
          <div className="text">
            Navigate
          </div>
        </div>
        <div className="p-inputgroup mb-10">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="p-inputgroup mb-10">
          <span className="p-inputgroup-addon">
            <i className="pi pi-key"></i>
          </span>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="login-buttons">
          <div className="text-right w-100">
            <button label="Submit" onClick={handleSubmit}>Submit</button>
          </div>
          <div className="text-left w-100">
            <button label="Cancel" className=" p-button-danger" onClick={goHome}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}