import { useState, useRef, useContext } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { INITIAL_EVENTS, createEventId } from '../../event-utils'
import { ThemeContext } from '../Theme/ThemeProvider'
import Modal from '../Modal/Modal'
import NewEvent from './NewEvent'
import EventContent from './EventContent'
import "./Calendar.scss"


export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [temporalInfo, setTemporalInfo] = useState({})

  const fullcalendar = useRef(null)
  const { language } = useContext(ThemeContext)

  function handleDateSelect(selectInfo) {
    if (fullcalendar.current.getApi().view.type === "dayGridMonth") {
      fullcalendar.current.getApi().changeView("timeGridWeek", selectInfo.start)
      return
    }

    setTemporalInfo(selectInfo)
    setIsOpen(true)
  }

  function addEvent(info) {
    let calendarApi = info.view.calendar
    calendarApi.unselect()

    calendarApi.addEvent({
      id: createEventId(),
      title: info.title,
      start: info.startStr,
      end: info.endStr,
      allDay: info.allDay,
      name: info.name,
      others: info.others
    })

    setIsOpen(false)
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event ${clickInfo.event.title} created by ${clickInfo.event.extendedProps.name}`)) {
      clickInfo.event.remove()
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
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventOverlap={false}
        slotMinTime={"08:00:00"}
        slotMaxTime={"23:59:59"}
        weekends={weekendsVisible}
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={EventContent} // custom render function
        eventClick={handleEventClick}
        eventsSet={setCurrentEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
      />
      <Modal isOpen={isOpen}>
        <h2 className="title">Reservar horario</h2>
        <NewEvent temporalInfo={temporalInfo} addEvent={addEvent} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  )
}