import React from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.scss";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";
require("typeface-libre-baskerville");

function Layout({ children, locale, pageTranslations }) {
    return (
        <>
            <Nav
                className={styles.nav}
                locale={locale}
                pageTranslations={pageTranslations}
            />
            <main className={styles.content}>{children}</main>
            <Footer
                locale={locale}
                className={styles.footer}
            />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    pageTranslations: PropTypes.arrayOf(
        PropTypes.shape({
            langKey: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        })
    ),
};

export default Layout;
