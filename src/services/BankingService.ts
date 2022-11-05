import axios from "axios";

export type Address = {
  addressType: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type Person = {
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  idNumber: string;
  idType: string;
  address: Address;
};

export type Business = {
  daoId: number;
  legalName: string;
  entityType: string;
  email: string;
  idType: string;
  idNumber: string;
  formationDate: string;
  address: Address;
};

export const BankingService = {
  createPerson: (walletAddress: string, person: Person) => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}identity/kyc/hackathon`,
        {
          walletAddress,
          ...person,
        },
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_ORG_ID!,
          },
        }
      )
      .then((res) => res.data);
  },

  kycStatus: (walletAddress: string) => {
    return axios
      .get(
        `${process.env.REACT_APP_BASE_API_URL}identity/kyc/status`,
        {
          headers: {
            'x-api-key': process.env.REACT_APP_API_ORG_ID!,
            'x-address': walletAddress,
          },
        }
      )
      .then((res) => res.data);
  },

  listCards: async () => {
    return axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/cards/consumer/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data);
  },

  createCardToken: async () => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}nucleus/cardToken`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },
};
