import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styles from "./Nav.module.scss";
import { Link, changeLocale } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

function Nav({ className, locale }) {
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
                        onClick={() => changeLocale(otherLocale)}
                    >
                        <FormattedMessage id={otherLocale} />
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
