import * as sc from "states-cities-db";

const COUNTRIES = sc.getCountries();

const getCountryTelCode = (country: any) =>
  country && COUNTRIES.find(({ iso }: {iso: string}) => iso === country).prefix;

export { COUNTRIES, getCountryTelCode };
