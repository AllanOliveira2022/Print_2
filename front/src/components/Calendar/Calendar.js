import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate, useParams } from "react-router-dom";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");

  const events = [
    {
      id: 1,
      title: "Aula de Matemática",
      start: new Date(2025, 5, 15, 8, 0),
      end: new Date(2025, 5, 15, 10, 0),
    },
    {
      id: 2,
      title: "Reunião de Departamento",
      start: new Date(2025, 5, 16, 14, 0),
      end: new Date(2025, 5, 16, 16, 0),
      resourceId: 1,
    },
  ];

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleView = (newView) => {
    setView(newView);
  };

  return (
    <div style={{ height: "600px" }} className="bg-white rounded-lg shadow-sm p-4">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        views={["month", "week", "day"]}
        startAccessor="start"
        endAccessor="end"
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleView}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: "green",
            fontSize: "0.85rem",
            borderRadius: "5px",
          },
        })}
        messages={{
          today: "Hoje",
          previous: "Anterior",
          next: "Próximo",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Nenhum evento neste período.",
        }}
      />
    </div>
  );
}

export default CalendarComponent;