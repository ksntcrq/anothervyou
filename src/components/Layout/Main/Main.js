import React from "react";
import styles from "./Main.module.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

function Main({ children, ...pageContext }) {
    return (
        <div className={styles.main}>
            <Header {...pageContext} />
            {children}
            <Footer />
        </div>
    );
}

export default Main;
