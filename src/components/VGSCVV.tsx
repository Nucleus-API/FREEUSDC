import "./vgs.css";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VGSShow: any;
  }
}

interface VGSCSSProps {
  showToken: string;
  solidCardId: string;
}

export const VGSCVV = (props: VGSCSSProps) => {
  const secretRef = useRef();

  useEffect(() => {
    const show = window.VGSShow.create(process.env.REACT_APP_VAULT_ID, function (state) {});
    const headers = { "sd-show-token": props.showToken };
    const cardNumber = show.request({
      name: "cvvIframe",
      method: "GET",
      headers,
      path: "/v1/card/" + props.solidCardId + "/show",
      jsonPathSelector: "cvv",
    });
    cardNumber.render(secretRef.current, {
      fontSize: "22px",
      color: "black",
      display: "block",
      fontWeight: "semibold",
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    });
    // eslint-disable-next-line
  }, []);

  return <div id="secret-card-cvv" ref={secretRef} />;
};
