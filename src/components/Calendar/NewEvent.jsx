import { useReducer } from "react"
import { useNavigate, useLocation } from "react-router-dom"

function reducer(state, action) {
  switch (action.type) {
    case "set_title":
      return {...state, title: action.title}

    case "set_start":
      return {...state, start: Date.parse(`${action.start}:00-03:00`), startStr: `${action.start}:00-03:00`}

    case "set_end":
      return {...state, end: Date.parse(`${action.end}:00-03:00`), endStr: `${action.end}:00-03:00`}

    case "set_other_people":
      return {...state, other_people: action.number, others: state.others.slice(0, action.number)}

    case "set_person":
      let auxOthers = [...state.others]
      auxOthers[action.person] = {name: action.name}
      return {...state, others: auxOthers }

    default:
      return {...state}
  }
}

export default function NewEvent({ temporalInfo, addEvent, setIsOpen, isUserLoggedIn }) {
  const [state, dispatch] = useReducer(reducer, {
    ...temporalInfo,
    title: "",
    other_people: 0,
    others: []
  })

  const navigate = useNavigate()
  const location = useLocation()

  function checkEvent() {
    if (state.end <= state.start)
      return alert("La fecha y hora de término debe ser posterior a la fecha y hora de inicio")

    if (!Boolean(state.title))
      return alert("Tu evento debe tener un título")

    if ((state.end - state.start) / 3600000 > 24)
      return alert("Por el momento no se pueden registrar eventos que duren más de un día")

    for (let i=0; i<state.other_people; i++) {
      if (!Boolean(state.others[i]?.name))
        return alert("Debes llenar el nombre de todos los acompañantes")
    }

    addEvent(state)
  }

  let others = []
  let currentPerson;
  for (let i=0; i<state.other_people; i++) {
    if (Boolean(state.others[i])) {
      currentPerson = state.others[i]
    } else {
      currentPerson = { name: "" }
    }
    others.push(
      <div className="field" key={`person_${i+1}`}>
        <label htmlFor={`person_${i+1}`}>{`Nombre acompañante ${i+1}`}</label>
        <input
          id={`person_${i+1}`}
          type="text"
          placeholder={`Nombre acompañante ${i+1}`}
          onChange={(e) => dispatch({type: "set_person", name: e.target.value, person: i})}
          value={currentPerson.name}
        />
      </div>
    )
  }

  if (!isUserLoggedIn) {
    return (
      <>
        <span className="title">Debes ingresar a tu sesión antes de crear un evento.</span>
        <span className="title">Si aún no tienes un usuario, puedes registrarte en la página web utilizando tu correo electrónico.</span>
        <div className="footer">
          <button className="button" onClick={() => navigate("/login", {state: {from: location.pathname}})}>
            <span className="material-icons button-icon">login</span>
            Ingresar
          </button>
          <button className="button dismiss" onClick={() => setIsOpen(false)}>
            <span className="material-icons button-icon">close</span>
            Cancelar
          </button>
        </div>
        <span className="text-link">
          Puedes registrarte haciendo click <a onClick={() => navigate("/register", {state: {from: location.pathname}})}>aquí</a>
        </span>
      </>
    )
  }

  return (
    <>
      <div className="form-row">
        <div className="field">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            placeholder="Título"
            onChange={(e) => dispatch({type: "set_title", title: e.target.value})}
            value={state.title}
          />
        </div>
        <div className="field">
          <label htmlFor="other_people">Número de acompañantes</label>
          <input
            id="other_people"
            type="number"
            min="0"
            step="1"
            placeholder="Número de acompañantes"
            onChange={(e) => dispatch({type: "set_other_people", number: e.target.value})}
            value={state.other_people}
          />
        </div>
      </div>
      <div className="form-row">
        {others}
      </div>
      <div className="footer">
        <button className="button" onClick={checkEvent}>
          <span className="material-icons button-icon">add</span>
          Registrar
        </button>
        <button className="button dismiss" onClick={() => setIsOpen(false)}>
          <span className="material-icons button-icon">close</span>
          Cancelar
        </button>
      </div>
    </>
  )
}