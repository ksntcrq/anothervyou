import React from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.scss";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
require("typeface-libre-baskerville");

function Layout({ children, pageTranslations }) {
    return (
        <>
            <Nav
                className={styles.nav}
                pageTranslations={pageTranslations}
            />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    pageTranslations: PropTypes.arrayOf({
        langKey: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
    }),
};

export default Layout;
