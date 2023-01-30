import { useEffect } from "react"
import { useReducer } from "react"

function reducer(state, action) {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000
  switch (action.type) {
    case "set_title":
      return {...state, title: action.title}

    case "set_name":
      return {...state, name: action.name}

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

export default function NewEvent({ temporalInfo, addEvent, setIsOpen }) {
  const [state, dispatch] = useReducer(reducer, {
    ...temporalInfo,
    title: "",
    name: "",
    other_people: 0,
    others: []
  })

  function checkEvent() {
    if (state.end <= state.start)
      return alert("La fecha y hora de término debe ser posterior a la fecha y hora de inicio")

    if (!Boolean(state.title))
      return alert("Tu evento debe tener un título")

    if (!Boolean(state.name))
      return alert("Por favor debes registrar tu nombre")

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
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            onChange={(e) => dispatch({type: "set_name", name: e.target.value})}
            value={state.name}
          />
        </div>
      </div>
      {/* <div className="form-row">
        <div className="field">
          <label htmlFor="start">Inicio</label>
          <input
            id="start"
            type="datetime-local"
            placeholder="Título"
            onChange={(e) => dispatch({type: "set_start", start: e.target.value})}
            value={state.startStr.substring(0, state.startStr.length - 6)}
          />
        </div>
        <div className="field">
          <label htmlFor="end">Término</label>
          <input
            id="end"
            type="datetime-local"
            placeholder="Nombre"
            onChange={(e) => dispatch({type: "set_end", end: e.target.value})}
            value={state.endStr.substring(0, state.endStr.length - 6)}
          />
        </div>
      </div> */}
      <div className="form-row">
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