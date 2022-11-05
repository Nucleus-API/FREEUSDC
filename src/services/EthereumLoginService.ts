import axios from "axios";
import { SiweMessage } from "siwe";

export const EthereumLoginService = {
  // TODO: Integrate passport-ethereum-siwe to be more secure.
  login: async (message: SiweMessage, signature: string) => {
    // const message = uuidv4();
    // const signature = await provider.send("personal_sign", [message, address]);
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}auth/ethereum`,
      {signature, message}
    ).then((res) => res.data)
  },
};
