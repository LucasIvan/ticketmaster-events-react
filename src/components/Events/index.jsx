import EventItem from './components/EventItem';
import { useNavigate } from 'react-router-dom';
import { memo } from "react";


const Events = ({ searchValue='', events}) => {
  
  const navigate = useNavigate();

  const handleEventItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const renderEvents = () => {
    let eventsFiltered = events;

    if (searchValue.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) => item.name.toLocaleLowerCase().includes(searchValue));
    }

    return eventsFiltered.map((eventItem) => (
      <EventItem
        key={`event-item-${eventItem.id}`}
        name={eventItem.name}
        info={eventItem.info}
        image={eventItem.images[0].url}
        onEventClick={handleEventItemClick}
        id={eventItem.id}
      />
    ));
  };

  return (
    <div>
      Eventos
      {renderEvents()}
    </div>
  );

};

export default memo(Events);