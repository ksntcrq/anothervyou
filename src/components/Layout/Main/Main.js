import React from "react";
import styles from "./Main.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

function Main({ children, ...pageContext }) {
    return (
        <div className={styles.main}>
            <Header className={styles.header} {...pageContext} />
            <div className={styles.content}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
}

export default Main;
