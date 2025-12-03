import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router";

const StatisticsPage = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCopies: 0,
    genres: {},
    authors: {},
  });

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "books"));

      let totalBooks = 0;
      let totalCopies = 0;
      let genres = {};
      let authors = {};

      snap.forEach((doc) => {
        const data = doc.data();
        totalBooks += 1;

        // count — строка, приводим к числу
        const c = Number(data.count) || 0;
        totalCopies += c;

        // ЖАНРЫ
        if (data.genre) {
          genres[data.genre] = (genres[data.genre] || 0) + 1;
        }

        // АВТОРЫ
        if (data.author) {
          authors[data.author] = (authors[data.author] || 0) + c;
        }
      });

      setStats({ totalBooks, totalCopies, genres, authors });
    }

    load();
  }, []);

  const topAuthors = Object.entries(stats.authors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const handlePrint = () => window.print();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
                <div style={styles.page2}>
                <Link style={{paddingRight: '10px'}} to="/">Главная</Link>
                         
              <Link to="/stats">Статистика</Link>
        </div>
        <h1 style={styles.title}>📊 Статистика библиотеки</h1>

        <div style={styles.cardGrid}>

          <div style={styles.card}>
            <h3>Всего книг</h3>
            <p style={styles.bigNum}>{stats.totalBooks}</p>
          </div>

          <div style={styles.card}>
            <h3>Всего экземпляров</h3>
            <p style={styles.bigNum}>{stats.totalCopies}</p>
          </div>
        </div>

        <h2 style={styles.subtitle}>📚 Книги по жанрам</h2>
        <div style={styles.listBlock}>
          {Object.entries(stats.genres).map(([g, c]) => (
            <div key={g} style={styles.row}>
              <span>{g}</span>
              <b>{c}</b>
            </div>
          ))}
        </div>

        <h2 style={styles.subtitle}>🏆 Топ-5 авторов</h2>
        <div style={styles.listBlock}>
          {topAuthors.map(([a, c]) => (
            <div key={a} style={styles.row}>
              <span>{a}</span>
              <b>{c}</b>
            </div>
          ))}
        </div>

        <button style={styles.printBtn} onClick={handlePrint}>
          🖨️ Печать статистики
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: "40px 0",
  },
    page2: {
    display: "flex",
    justifyContent: "center",
    margin: '0 auto',
    width: '60px'
  },
  container: {
    width: "700px",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
  },
  cardGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    background: "#f4f4f4",
    borderRadius: "12px",
    padding: "20px 30px",
    minWidth: "200px",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  bigNum: {
    fontSize: "28px",
    fontWeight: "bold",
    marginTop: "5px",
  },
  subtitle: {
    marginTop: "35px",
    marginBottom: "10px",
  },
  listBlock: {
    margin: "0 auto",
    width: "80%",
    textAlign: "left",
    background: "#fafafa",
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 0 4px rgba(0,0,0,0.05)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #e5e5e5",
  },
  printBtn: {
    marginTop: "40px",
    padding: "12px 25px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "10px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    transition: "0.2s",
  }
};
    

export default StatisticsPage