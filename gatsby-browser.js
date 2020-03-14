import "./src/styles/styles.scss";
import { IntlProvider } from "react-intl";
import React from "react";

export const wrapPageElement = ({
    element,
    props: {
        pageContext: { locale = "en" },
    },
}) => {
    const messages = require(`./src/intl/${locale}.json`);
    return (
        <IntlProvider locale={locale} messages={messages}>
            {element}
            <link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet" />
        </IntlProvider>
    );
};
