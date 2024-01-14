import React from "react";

import { Container } from "./style";
import {Link} from "react-router-dom"

export default function Header() {
  return (
    <Container>
      <div className="header">
        <a href="/" className="logo">Кейс-задача 4. Менеджер проектов</a>
        <dir>
          <Link to="/users"><button>Пользователи</button></Link>
          <button>Выход</button>
        </dir>

      </div>

    </Container>
  );
}
