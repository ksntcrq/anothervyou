import "./src/styles/styles.scss";
import { IntlProvider } from "react-intl";
import React from "react";
import Analytics from "./src/components/Analytics/Analytics";

export const wrapPageElement = ({
    element,
    props: {
        pageContext: { locale = "en" },
    },
}) => {
    const messages = require(`./src/intl/${locale}.json`);
    return (
        <>
            <IntlProvider locale={locale} messages={messages}>
                {element}
            </IntlProvider>
            <Analytics />
        </>
    );
};
