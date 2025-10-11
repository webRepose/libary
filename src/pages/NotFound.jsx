import { Link } from "react-router-dom";
// import Style from "../styles/sComponents/notFound.module.scss";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
