import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";
import EditProfileModal from "../components/EditProfileModal";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../css/ProfilePage.css";
import { BASE_URL } from "../Constants";

function ProfilePage() {
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState(null);
    const [cartItemsNumber, setCartItemsNumber] = useState(0);

    let logged_in = false;
    let user_id = localStorage.getItem("user_id");

    if (user_id) {
        logged_in = true;
    }

    useEffect(() => {
        if (user_id && logged_in) {
            getProfile();
        }

        const cartItems = JSON.parse(localStorage.getItem("items"));
        let counter = 0;
        if (cartItems) {
            for (let i = 0; i < cartItems.length; i++) {
                counter = counter + cartItems[i].quantity;
            }
            setCartItemsNumber(counter);
        }
    }, []);

    const getProfile = () => {
        fetch(`${BASE_URL}/users/${user_id}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            });
    };

    return (
        <>
            <NavbarComponent cartItemsNumber={cartItemsNumber} />
            <>
                <div
                    className="container d-flex flex-column align-items-center mt-5 pt-5"
                    id="container"
                >
                    {logged_in && user ? (
                        <>
                            <h3 className="main-title">
                                <u>Твой профиль</u>
                            </h3>
                            <dl className="profile mt-3">
                                <dt>
                                    <strong>Имя: </strong>
                                </dt>
                                <dd>{user.name}</dd>
                                <dt>
                                    <strong>Email: </strong>
                                </dt>
                                <dd>{user.email}</dd>
                                {user.address.street ? (
                                    <>
                                        <dt>
                                            <strong>Адрес: </strong>
                                        </dt>
                                        <dd>
                                            {user.address.street + " улица"},{" "}
                                            {user.address.suite},
                                            {user.address.zipcode},{" "}
                                            {user.address.city}
                                        </dd>
                                    </>
                                ) : (
                                    <>
                                        <dt>
                                            <strong>Адрес: </strong>
                                        </dt>
                                        <dd>
                                            У тебя еще нет адреса.
                                        </dd>
                                    </>
                                )}
                                {user.phone ? (
                                    <>
                                        <dt>
                                            <strong>Номер телефона: </strong>
                                        </dt>
                                        <dd>{user.phone}</dd>
                                    </>
                                ) : (
                                    <>
                                        <dt>
                                            <strong>Номер телефона: </strong>
                                        </dt>
                                        <dd>
                                            У тебя еще нет номера телефона.
                                        </dd>
                                    </>
                                )}
                            </dl>

                            <Button
                                variant="outline-danger"
                                onClick={() => setModalShow(true)}
                            >
                                Редактировать профиль
                            </Button>
                            <EditProfileModal
                                id={user_id}
                                name={user.name}
                                username={user.username}
                                email={user.email}
                                password={user.password}
                                role={user.role}
                                street={user.address.street}
                                suite={user.address.suite}
                                city={user.address.city}
                                zipcode={user.address.zipcode}
                                phone={user.phone}
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                getProfile={getProfile}
                            />
                        </>
                    ) : (
                        <>
                            <h3 className="main-title">
                                Ты еще не залогинен.
                            </h3>
                            <a href="/auth/login">Домой</a>
                        </>
                    )}
                </div>
                <div className="profile-footer">
                    <FooterComponent />
                </div>
            </>
        </>
    );
}

export default ProfilePage;
