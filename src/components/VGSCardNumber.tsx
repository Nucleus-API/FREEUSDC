import "./vgs.css";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    VGSShow: any;
  }
}

interface VGSCardNumberProps {
  showToken: string;
  solidCardId: string;
}

export const VGSCardNumber = (props: VGSCardNumberProps) => {
  const secretRef = useRef();

  useEffect(() => {
    const show = window.VGSShow.create(process.env.REACT_APP_VAULT_ID, function (state) {});
    const headers = { "sd-show-token": props.showToken };
    const cardNumber = show.request({
      name: "cardNoIframe",
      method: "GET",
      headers,
      path: "/v1/card/" + props.solidCardId + "/show",
      jsonPathSelector: "cardNumber",
      serializers: [show.SERIALIZERS.replace("(\\d{4})(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3 $4")],
    });
    cardNumber.render(secretRef.current, {
      fontSize: "16px",
      color: "black",
      display: "block",
      fontWeight: "semibold",
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    });
    // eslint-disable-next-line
  }, []);

  return <div id="secret-card-number" ref={secretRef} />;
};
