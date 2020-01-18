import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styles from "./Header.module.scss";
import { Link, changeLocale } from "gatsby-plugin-intl";
import { FormattedMessage } from "react-intl";
import classNames from 'classnames';

function Header({ className, locale }) {
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
        <header className={classNames(className, styles.header)}>
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
        </header>
    );
}

export default Header;
