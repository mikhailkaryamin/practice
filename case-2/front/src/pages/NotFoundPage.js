import "../css/NotFoundPage.css";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <div className="main-notfound">
                <div className="notfound-content">
                    <h3 className="notfound-header">
                        Что-то пошло не так
                    </h3>
                    <h4 className="notfound-link">
                        Вернуться{" "}
                        <Link className="link" to="/">
                            Домой
                        </Link>
                    </h4>
                </div>
            </div>
        </>
    );
}

export default NotFoundPage;
