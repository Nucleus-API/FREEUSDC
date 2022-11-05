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
  createPerson: (person: Person) => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}banking/createPerson`,
        {
          ...person,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },

  getIdv: () => {
    return axios
      .get(
        `${process.env.REACT_APP_BASE_URL}banking/idv`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },

  createBusiness: (business: Business) => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}banking/createBusiness`,
        {
          ...business,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },

  kycStatus: () => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}banking/kycStatus`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },

  kybStatus: (daoId: number) => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}banking/kybStatus`,
        {
          daoId: daoId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },

  acceptUserTerms: () => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}banking/acceptUserTerms`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },

  acceptBusinessTerms: (daoId: number) => {
    return axios
      .post(
        `${process.env.REACT_APP_BASE_URL}banking/acceptBusinessTerms`,
        {
          daoId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  },
};
