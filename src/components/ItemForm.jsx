import React, { useState, useEffect } from "react";
import Style from "../styles/sComponents/itemForm.module.scss";

const genres = [
  "Фантастика",
  "Роман",
  "Детектив",
  "Фэнтези",
  "Приключения",
  "История",
  "Учебная литература",
  "Научная литература",
  "Другое",
];

const ItemForm = ({ onSubmit, editItem, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "", // теперь это будет полная дата в формате YYYY-MM-DD
    count: "",
    description: "",
    coverUrl: "",
  });

// если редактирование — подставляем данные
useEffect(() => {
  if (editItem) {
    setFormData({
      ...editItem,
      year: editItem.year
        ? editItem.year.toDate // если Timestamp, конвертируем
          ? editItem.year.toDate().toISOString().split("T")[0]
          : new Date(editItem.year).toISOString().split("T")[0]
        : "",
    });
  }
}, [editItem]);

  // обновление состояния при вводе
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Введите название и автора книги!");
      return;
    }

    onSubmit({
      ...formData,
      year: formData.year ? new Date(formData.year) : null, // сохраняем как объект Date
    });

    // очистка формы
    setFormData({
      title: "",
      author: "",
      genre: "",
      year: "",
      count: "",
      description: "",
      coverUrl: "",
    });
  };

  return (
    <form className={Style.item_form} onSubmit={handleSubmit}>
      <h2>{editItem ? "Редактировать книгу" : "Добавить книгу"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Название"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Автор"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      >
        <option value="">Выберите жанр</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="year"
        placeholder="Дата издания"
        value={formData.year}
        onChange={handleChange}
      />

      <input
        type="number"
        name="count"
        placeholder="Количество экземпляров"
        value={formData.count}
        onChange={handleChange}
        min="1"
      />

      <textarea
        name="description"
        placeholder="Описание"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="coverUrl"
        placeholder="Ссылка на обложку (URL)"
        value={formData.coverUrl}
        onChange={handleChange}
      />

      <div className={Style.form_actions}>
        <button type="submit">{editItem ? "Сохранить" : "Добавить"}</button>
        {editItem && (
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;
