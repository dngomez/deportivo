import { useEffect, useState, useRef, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { ThemeContext } from '../Theme/ThemeProvider'
import { AuthContext } from '../Auth/AuthProvider'
import Modal from '../Modal/Modal'
import NewEvent from './NewEvent'
import EventContent from './EventContent'
import { CalendarEvent } from "../../Helpers/CalendarEvent"
import "./Calendar.scss"


export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [temporalInfo, setTemporalInfo] = useState({})

  const fullcalendar = useRef(null)
  const { language } = useContext(ThemeContext)
  const { user, isTokenValid, isUserLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    CalendarEvent.getAll()
    .then(res => {
      setCurrentEvents(res.results)
    })
  }, [])

  function handleDateSelect(selectInfo) {
    if (fullcalendar.current.getApi().view.type === "dayGridMonth") {
      fullcalendar.current.getApi().changeView("timeGridWeek", selectInfo.start)
      return
    }

    setTemporalInfo(selectInfo)
    setIsOpen(true)
  }

  async function addEvent(info) {
    if (!isTokenValid) return

    let event = {
      title: info.title,
      start: info.startStr,
      startDate: info.start,
      end: info.endStr,
      endDate: info.end,
      allDay: info.allDay,
      user: user.user._id,
      name: `${user.user.first_name} ${user.user.last_name}`,
      others: info.others
    }

    let data = await CalendarEvent.create(user, event)
    if ('error' in data) {
      console.log(data.error)
    } else {
      info.view.calendar.addEvent({...event, _id: data.event._id})
    }
    info.view.calendar.unselect()

    setIsOpen(false)
  }

  async function updateEvent({ event, oldEvent, revert }) {
    if (!isUserLoggedIn) return

    // if (event.extendedProps.user !== user.user._id) {
    //   alert("Este evento no es tuyo, no puedes modificarlo")
    //   revert()
    //   return
    // }

    let changes = {}
    if (event.start !== oldEvent.start) changes["start"] = event.start
    if (event.startStr !== oldEvent.startStr) changes["startStr"] = event.startStr
    if (event.end !== oldEvent.end) changes["end"] = event.end
    if (event.endStr !== oldEvent.endStr) changes["endStr"] = event.endStr
    if (event.title !== oldEvent.title) changes["title"] = event.title

    let data = await CalendarEvent.update(user, event.extendedProps._id, changes)
    if ('error' in data) {
      console.log(data.error)
      revert()
    }
  }

  async function handleEventClick(clickInfo) {
    if (!isUserLoggedIn) return alert("Debes ingresar para modificar tus eventos")
    if (confirm(`Est??s seguro de que quieres eliminar el evento ${clickInfo.event.title}?`)) {
      let data = await CalendarEvent.delete(user, clickInfo.event.extendedProps._id)
      if ('error' in data) {
        console.log(data)
      } else {
        clickInfo.event.remove()
      }
    }
  }

  function viewChange(event) {
    if (event.view.type === "dayGridMonth") setWeekendsVisible(true)
    else if (event.view.type === "timeGridWeek") setWeekendsVisible(false)
  }

  return (
    <div className='calendar'>
      <FullCalendar
        ref={fullcalendar}
        height={"100%"}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prevYear,prev,next,nextYear today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        locales={[ esLocale ]}
        allDaySlot={true}
        viewDidMount={viewChange}
        locale={language}
        initialView='dayGridMonth'
        firstDay={1}
        editable={isUserLoggedIn}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventOverlap={false}
        slotMinTime={"08:00:00"}
        slotMaxTime={"23:59:59"}
        weekends={weekendsVisible}
        // initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
        events={currentEvents}
        select={handleDateSelect}
        eventContent={EventContent} // custom render function
        eventClick={handleEventClick}
        // eventsSet={setCurrentEvents} // called after events are initialized/added/changed/removed
        // Database can be updated when these events are triggered
        eventChange={updateEvent}
        eventRemove={function(){}}
      />
      <Modal isOpen={isOpen}>
        <h2 className="title">Reservar horario</h2>
        <NewEvent temporalInfo={temporalInfo} addEvent={addEvent} setIsOpen={setIsOpen} isUserLoggedIn={isUserLoggedIn} />
      </Modal>
    </div>
  )
}