import React from "react";
import styles from "./Layout.module.scss";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

function Layout({ children, ...pageContext }) {
    return (
        <>
            <Nav className={styles.nav} {...pageContext} />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
        </>
    );
}

export default Layout;
