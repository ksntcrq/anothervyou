import React from "react";
import { createPortal } from 'react-dom';

function Analytics() {
    return createPortal(
        <>
            <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-117280991-1"
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      
                      gtag('config', 'UA-117280991-1');
                    `,
                }}
            />
        </>,
        document.getElementsByTagName("body")[0]
    );
}

export default React.memo(Analytics);
