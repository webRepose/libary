import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import ItemForm from "../components/ItemForm";
import SearchBar from "../components/SearchBar";
import Style from "../styles/sPages/Inventory.module.scss";

// импорт функций из сервиса
import {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
} from "../services/inventoryService.js";

const Inventory = () => {
  const [items, setItems] = useState([]); // все книги
  const [filteredItems, setFilteredItems] = useState([]); // отфильтрованные
  const [editItem, setEditItem] = useState(null); // книга для редактирования

  // при загрузке страницы — получить все книги из Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setItems(books);
      setFilteredItems(books);
    };
    fetchBooks();
  }, []);

  // добавление или обновление книги
  const handleAddOrUpdate = async (itemData) => {
    if (editItem) {
      await updateBook(editItem.id, itemData);
      setEditItem(null);
    } else {
      await addBook(itemData);
    }

    // обновить список
    const books = await getAllBooks();
    setItems(books);
    setFilteredItems(books);
  };

  // удаление книги
  const handleDelete = async (id) => {
    await deleteBook(id);
    const books = await getAllBooks();
    setItems(books);
    setFilteredItems(books);
  };

  // редактирование книги
  const handleEdit = (item) => {
    setEditItem(item);
  };

  // фильтрация (поиск)
  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.author.toLowerCase().includes(lower)
    );
    setFilteredItems(filtered);
  };

  return (
    <div className={Style.inventory_page}>
      <h1>Учёт школьной библиотеки</h1>

      <div className={Style.inventory_top}>
        <ItemForm
          onSubmit={handleAddOrUpdate}
          editItem={editItem}
          onCancel={() => setEditItem(null)}
        />

        <SearchBar onSearch={handleSearch} />
      </div>

      <div className={Style.inventory_list}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Нет книг для отображения</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
