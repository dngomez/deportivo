import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./Auth/AuthProvider";
import { motion } from "framer-motion";
import Logo from "./Logo/Logo";
import "./Login.scss"

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

  return (
    <div className="login">
      <motion.div
        className="content"
        initial={{ opacity: 0.2, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <Logo />
        <div className="field">
          <span className="material-icons button-icon">mail</span>
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <span className="material-icons button-icon">password</span>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="login-buttons">
          <button className="button" onClick={handleSubmit}>
            <span className="material-icons button-icon">login</span>
            Ingresar
          </button>
          <button className="button" onClick={() => navigate("/register")}>
            <span className="material-icons button-icon">person_add</span>
            Registrar
          </button>
          <button className="button dismiss" onClick={() => navigate("/")}>
            <span className="material-icons button-icon">close</span>
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}