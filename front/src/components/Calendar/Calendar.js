import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import ReservaService from "../../services/reservaService"; // import do service

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

function CalendarComponent({ espacoId }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const reservas = await ReservaService.getReservasAceitas();
        // Filtra por espacoId e converte para eventos do calendário
        const eventosEspaco = reservas
          .filter((r) => String(r.espacoId) === String(espacoId))
          .map((r) => ({
            id: r.id,
            title: r.Usuario?.nome || "Reserva",
            start: new Date(r.data_inicio),
            end: new Date(r.data_fim),
          }));
        setEvents(eventosEspaco);
      } catch (err) {
        setEvents([]);
      }
    }
    if (espacoId) fetchReservas();
  }, [espacoId]);

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