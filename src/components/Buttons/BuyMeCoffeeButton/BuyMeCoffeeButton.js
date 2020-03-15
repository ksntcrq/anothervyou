import React from "react";
import styles from "./BuyMeCoffeeButton.module.scss";
import { FormattedMessage } from "react-intl";

function BuyMeCoffeeButton() {
    return (
        <a
            className={styles.bmcButton}
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.buymeacoffee.com/ksntcrq"
        >
            <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                alt="Buy me a coffee"
            />
            <span className={styles.text}>
                <FormattedMessage id="buy_me_a_coffee" />
            </span>
        </a>
    );
}

export default BuyMeCoffeeButton;
