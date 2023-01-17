import { useState, useRef, useContext } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { ThemeContext } from './components/Theme/ThemeProvider'


export default function DemoApp() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  const fullcalendar = useRef(null)
  const { theme, setTheme, language, setLanguate } = useContext(ThemeContext)

  let sidebarEvents = []
  currentEvents.map((event) => {
    console.log(event)
    sidebarEvents.push(
      <li key={event.id}>
        <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
        <span>{event.title}</span>
        <span>{event.extendedProps.name}</span>
      </li>
    )
  })

  let sidebar = (
    <div className='demo-app-sidebar'>
      <div className='demo-app-sidebar-section'>
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {sidebarEvents}
        </ul>
      </div>
    </div>
  )

  function handleDateSelect(selectInfo) {
    if (fullcalendar.current.getApi().view.type === "dayGridMonth") {
      fullcalendar.current.getApi().changeView("timeGridWeek", selectInfo.start)
      return
    }

    let title = prompt('Please enter a new title for your event')
    if (!Boolean(title)) return
    let name = prompt('What is your name?')
    if (!Boolean(name)) return

    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        name: name,
        allDay: selectInfo.allDay
      })
    }
  }

  function handleEventClick(clickInfo) {
    console.log(clickInfo)
    if (confirm(`Are you sure you want to delete the event ${clickInfo.event.title} created by ${clickInfo.event.extendedProps.name}`)) {
      clickInfo.event.remove()
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  function viewChange(event) {
    if (event.view.type === "dayGridMonth") setWeekendsVisible(true)
    else if (event.view.type === "timeGridWeek") setWeekendsVisible(false)
  }

  return (
    <div className='demo-app'>
      {sidebar}
      <div className='demo-app-main' style={{height: "600px"}}>
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
          viewDidMount={viewChange}
          locale={language}
          initialView='dayGridMonth'
          firstDay={1}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          slotMinTime={"08:00:00"}
          slotMaxTime={"23:59:59"}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={setCurrentEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
    </div>
  )
}