import { useIntl } from "react-intl";

const useEnhancedIntl = () => {
    const enhancedIntl = useIntl();

    enhancedIntl.mapFormatMessage = key =>
        enhancedIntl.formatMessage({ id: key });

    return enhancedIntl;
};

export default useEnhancedIntl;
