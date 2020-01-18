import React from "react";
import styles from "./Main.module.scss";
import Header from "../../Header/Header";

function Main({ children, ...pageContext }) {
    return (
        <div className={styles.main}>
            <Header {...pageContext} />
            {children}
        </div>
    );
}

export default Main;
