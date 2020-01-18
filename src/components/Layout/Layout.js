import React from "react";
import PropTypes from 'prop-types';
import styles from "./Layout.module.scss";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

function Layout({ children, locale }) {
    return (
        <>
            <Nav className={styles.nav} locale={locale} />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
        </>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
}

export default Layout;
