import { FaVk } from "react-icons/fa";

function FooterComponent(props) {
    return (
        <div
            className={
                props.position === "absolute"
                    ? props.page === "Home"
                        ? "footer footer-home footer-absolute"
                        : "footer footer-absolute"
                    : "footer"
            }
        >
            <p className="copyright">Кейс 2. Книжный магазин</p>
            <ul className="footer-list">
                <li className="footer-item">
                    <a href="#" target="_blank" rel="noreferrer">
                        <FaVk />
                    </a>
                </li>
                <li className="footer-item">
                    <a href="#" target="_blank" rel="noreferrer">
                        <FaVk />
                    </a>
                </li>
                <li className="footer-item">
                    <a href="#" target="_blank" rel="noreferrer">
                        <FaVk />
                    </a>
                </li>
                <li className="footer-item">
                    <a href="#" target="_blank" rel="noreferrer">
                        <FaVk />
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default FooterComponent;
