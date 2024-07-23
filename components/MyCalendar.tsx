'use client'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { Calendar, Event, momentLocalizer, View } from 'react-big-calendar'
import { useCallback, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { enNZ } from 'date-fns/locale/en-NZ'

const localizer = momentLocalizer(moment)

export default function MyCalendar() {
  const DnDCalendar = withDragAndDrop(Calendar)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const locales = {
    'en-NZ': enNZ,
  }

  const eventStart = new Date('2024-07-23T14:30:00.000+12:00')
  const eventEnd = new Date('2024-07-23T16:00:00.000+12:00')

  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Learn cool stuff',
      start: eventStart,
      end: eventEnd,
    },
  ])

  const [view, setView] = useState<View>('day')
  const [date, setDate] = useState<Date>(new Date())

  const onView = useCallback((newView: View) => setView(newView), [view])

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [date])

  const handleSelectSlot = useCallback(({ start, end }: any) => {
    console.log('empty slot')
    console.log(start)
    // const title = window.prompt('New Event name')
    onOpen()
    // if (title) {
    //   setEvents((prev) => [...prev, { start, end, title }])
    // }
  }, [])
  return (
    <div>
      <DnDCalendar
        view={view}
        onView={onView}
        events={events}
        date={date}
        onNavigate={onNavigate}
        localizer={localizer}
        selectable
        onSelectSlot={handleSelectSlot}
        resizable
        showMultiDayTimes
        style={{ height: '80vh' }}
      />
    </div>
  )
}
