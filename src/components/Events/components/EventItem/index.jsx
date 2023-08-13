import styles from './EventItem.module.css';
import useLikeEvents from '../../../../hooks/useLikeEvents';
import HearthFilled from '../../../../assets/hearth-filled.png'
import HearthUnfilled from '../../../../assets/hearth-unfilled.png'


const EventItem = ({ id, info, name, image, onEventClick }) => {

  const { isEventLiked, toggleEventLike } = useLikeEvents(id);

  const handleSeeMoreClick = (event) => {
    event.stopPropagation();
    onEventClick(id)
  }

  const handleHearthClick = () => {
    toggleEventLike();
  };

  return (
    <div className={styles.eventItemContainer}>
      <div className={styles.imageContainer}>
        <img src={isEventLiked ? HearthFilled : HearthUnfilled} alt="Hearth button" className={styles.hearthImage} onClick={handleHearthClick}/>
        <img src={image} alt='' width={300} height={200} />
      </div>
      <div className={styles.eventInfoContainer}>
        <h4 className={styles.eventName}>{name}</h4>
        <p className={styles.eventInfo}>{info}</p>
        <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>
          Ver Más
        </button>
      </div>
    </div>
  )
}

export default EventItem;