import { db } from '../firebase.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

console.log("DB:", db);

// Коллекция книг
const booksCollection = collection(db, "books");

// Добавить книгу
export const addBook = async (book) => {
  try {
    await addDoc(booksCollection, book);
  } catch (error) {
    console.error("Ошибка при добавлении книги:", error);
  }
};

// Получить все книги
export const getAllBooks = async () => {
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Обновить книгу
export const updateBook = async (id, updatedBook) => {
  const bookRef = doc(db, "books", id);
  await updateDoc(bookRef, updatedBook);
};

// Удалить книгу
export const deleteBook = async (id) => {
  const bookRef = doc(db, "books", id);
  await deleteDoc(bookRef);
};
