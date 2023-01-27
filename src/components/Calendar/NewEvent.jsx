import { useEffect } from "react"
import { useReducer } from "react"

function reducer(state, action) {
  switch (action.type) {
    case "set_title":
      return {...state, title: action.title}

    case "set_name":
      return {...state, name: action.name}

    case "set_start":
      console.log(action.start)
      return {...state, start: Date.parse(`${action.start}:00-03:00`), startStr: `${action.start}:00-03:00`}

    case "set_end":
      return {...state, end: Date.parse(`${action.end}:00-03:00`), endStr: `${action.end}:00-03:00`}

    default:
      return {...state}
  }
}

export default function NewEvent({ temporalInfo, addEvent }) {
  const [state, dispatch] = useReducer(reducer, {
    ...temporalInfo,
    title: "",
    name: ""
  })

  function checkEvent() {
    if (state.end <= state.start)
      return alert("La fecha y hora de término debe ser posterior a la fecha y hora de inicio")

    if (!Boolean(state.title))
      return alert("Tu evento debe tener un título")

    if (!Boolean(state.name))
      return alert("Por favor debes registrar tu nombre")
    addEvent(state)
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
      <div className="form-row">
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
      </div>
      <button className="button" onClick={checkEvent}>
        Registrar
      </button>
    </>
  )
}