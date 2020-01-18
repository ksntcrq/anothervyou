import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import styles from "./Nav.module.scss";
import { Link, changeLocale } from "gatsby-plugin-intl";
import classNames from "classnames";

function Nav({ className, locale, translatedPageSlug }) {
    const otherLocale = locale === "fr" ? "en" : "fr";

    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    return (
        <nav className={classNames(className, styles.nav)}>
            <div className={styles.brandWrapper}>
                <Link className={styles.brand} to="/">
                    {data.site.siteMetadata.title}
                </Link>
            </div>
            <ul className={styles.menu}>
                <li>
                    <button
                        className={styles.btnLink}
                        onClick={() =>
                            changeLocale(otherLocale, translatedPageSlug)
                        }
                    >
                        {otherLocale === "fr"
                            ? "Lire en Français"
                            : "Read in English"}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

Nav.propTypes = {
    locale: PropTypes.string.isRequired,
    className: PropTypes.string,
    translatedPageSlug: PropTypes.string,
};

export default Nav;
