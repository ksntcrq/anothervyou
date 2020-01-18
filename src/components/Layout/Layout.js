import React from "react";
import PropTypes from "prop-types";
import styles from "./Layout.module.scss";
import Nav from "./Nav/Nav";
import Footer from "./Footer/Footer";

function Layout({ children, locale, translatedPageSlug }) {
    return (
        <>
            <Nav
                className={styles.nav}
                locale={locale}
                translatedPageSlug={translatedPageSlug}
            />
            <main className={styles.content}>{children}</main>
            <Footer className={styles.footer} />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    locale: PropTypes.string.isRequired,
    translatedPageSlug: PropTypes.string,
};

export default Layout;
