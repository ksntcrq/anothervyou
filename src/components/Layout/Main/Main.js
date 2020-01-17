import React from "react";
import styles from "./Main.module.scss";
import Header from "../../Header/Header";

function Main({ children }) {
    return (
        <div className={styles.main}>
            <Header />
            {children}
        </div>
    );
}

export default Main;
