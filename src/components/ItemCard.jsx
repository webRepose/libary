import Style from '../styles/sComponents/ItemCard.module.scss';

const ItemCard = ({ item, onEdit, onDelete }) => {
  const { title, author, genre, year, count, description, coverUrl } = item;

  // 🔹 Преобразование Firestore Timestamp → нормальная дата
  let formattedDate = "";
  if (year) {
    const dateObj = year.toDate?.() ?? new Date(year);
    formattedDate = dateObj.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div className={Style.item_card}>
      <div className={Style.item_card__image}>
        {coverUrl ? (
          <img src={coverUrl} alt={title} />
        ) : (
          <div className={Style.item_card__placeholder}>Нет обложки</div>
        )}
      </div>

      <div className={Style.item_card__info}>
        <h3 className={Style.item_card__title}>{title}</h3>
        <p className={Style.item_card__author}>{author}</p>
        <p className={Style.item_card__genre}>
          {genre} {formattedDate && `• ${formattedDate}`}
        </p>
        <p className={Style.item_card__count}>Экземпляров: {count}</p>

        {/* Можно опционально добавить краткое описание */}
        {description && (
          <p className={Style.item_card__description}>
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
        )}
      </div>

      <div className={Style.item_card__actions}>
        <button className={Style.item_card__edit} onClick={() => onEdit(item)}>
          Редактировать
        </button>
        <button
          className={Style.item_card__delete}
          onClick={() => onDelete(item.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
