// 'use client'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import {
  Calendar,
  dateFnsLocalizer,
  DateLocalizer,
  Event,
  momentLocalizer,
} from 'react-big-calendar'
import { useCallback, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import PropTypes from 'prop-types'
import moment from 'moment'
import { enNZ } from 'date-fns/locale/en-NZ'

const localizer = momentLocalizer(moment)

export default function MyCalendar() {
  const DnDCalendar = withDragAndDrop(Calendar)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const locales = {
    'en-NZ': enNZ,
  }

  const eventStart = new Date('2024-05-18T14:30:00.000+12:00')
  const eventEnd = new Date('2024-05-18T16:00:00.000+12:00')

  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Learn cool stuff',
      start: eventStart,
      end: eventEnd,
    },
  ])

  const [view, setView]: any = useState('day')
  const onView = useCallback((newView: string) => setView(newView), [view])
  return (
    <div>
      <DnDCalendar
        view={view}
        onView={onView}
        events={events}
        localizer={localizer}
        selectable
        // onSelectSlot={handleSelectSlot}
        resizable
        style={{ height: '100vh' }}
      />
    </div>
  )
}
