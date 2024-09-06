import axios, { AxiosPromise } from "axios"
import { CarData } from "../interface/CarData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

  const fetchData = async ({ queryKey }: { queryKey: [string, string, string, string] }): AxiosPromise<CarData[]> => {
    const [, text, categoriesNames, sort] = queryKey;
    const values = sort.split(",");
    const response = axios.get(API_URL + `/cars/searchall?text=${text}&categoriesNames=${categoriesNames}&direction=${values[0]}&parameter=${values[1]}`);
    return response;
  }

export function useCarData(text: string, categoriesNames: string, sort: string) {
  const query = useQuery({
    queryFn: fetchData, 
    queryKey:  ['car-data', text, categoriesNames, sort],
    retry: 2
  })

  return {
    ...query,
    cars: query.data?.data
  }
}