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
import EventDetails from './EventDetails'
import EventContent from './EventContent'
import { CalendarEvent } from "../../Helpers/CalendarEvent"
import "./Calendar.scss"
import { useNavigate, useParams } from 'react-router-dom'


export default function Calendar() {
  const { viewType, date } = useParams()
  const navigate = useNavigate()
  const [currentEvents, setCurrentEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(undefined)
  const [newEventModalIsOpen, setNewEventModalIsOpen] = useState(false)
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false)
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

  useEffect(() => {
    fullcalendar.current.getApi().render()
  }, [currentEvents])

  useEffect(() => {
    let selectedDate = date ?? new Date()
    fullcalendar.current.getApi().gotoDate(selectedDate)
    if (viewType === "day") {
      fullcalendar.current.getApi().changeView("timeGridDay", selectedDate)
    } else {
      fullcalendar.current.getApi().changeView("dayGridMonth", selectedDate)
    }
  }, [viewType, date])

  function handleDateSelect(selectInfo) {
    if (fullcalendar.current.getApi().view.type === "dayGridMonth") {
      navigate(`/calendar/day/${selectInfo.startStr}`)
      fullcalendar.current.getApi().changeView("timeGridDay", selectInfo.start)
      return
    }

    setTemporalInfo(selectInfo)
    setNewEventModalIsOpen(true)
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
      name: `${user.user.first_name.split(' ')[0]} ${user.user.last_name.split(' ')[0]}`,
      description: info.description,
      others: info.others
    }

    let data = await CalendarEvent.create(user, event)
    if ('error' in data) {
      console.log(data.error)
    } else {
      info.view.calendar.addEvent({...event, _id: data.event._id})
    }
    info.view.calendar.unselect()

    setNewEventModalIsOpen(false)
  }

  async function updateEvent({ event, oldEvent, revert }) {
    if (!isUserLoggedIn) return

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

  async function removeEvent(event) {
    let data = await CalendarEvent.delete(user, event.event.extendedProps._id)
    if ('error' in data) {
      alert("No se pudo eliminar el evento.\nPor favor cierra tu sesión, vuelve a ingresar e intenta nuevamente.\nSi el problema persiste puedes contactar a Diego Gómez [dngomez.e@gmail.com].")
    }
  }

  async function handleEventClick(clickInfo) {
    setSelectedEvent(clickInfo.event)
    setDetailsModalIsOpen(true)
  }

  function viewChange(event) {
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
        allDaySlot={false}
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
        weekends={true}
        longPressDelay={500}
        // initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
        events={currentEvents}
        select={handleDateSelect}
        eventContent={EventContent} // custom render function
        eventClick={handleEventClick}
        // eventsSet={setCurrentEvents} // called after events are initialized/added/changed/removed
        // Database can be updated when these events are triggered
        eventChange={updateEvent}
        eventRemove={removeEvent}
      />
      <Modal isOpen={newEventModalIsOpen}>
        <h2 className="title">Reservar horario</h2>
        <NewEvent temporalInfo={temporalInfo} addEvent={addEvent} setIsOpen={setNewEventModalIsOpen} isUserLoggedIn={isUserLoggedIn} />
      </Modal>
      <Modal isOpen={detailsModalIsOpen}>
        <EventDetails event={selectedEvent} setIsOpen={setDetailsModalIsOpen} user={user} />
      </Modal>
    </div>
  )
}