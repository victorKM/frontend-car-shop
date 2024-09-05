import axios, { AxiosPromise } from "axios"
import { CarData } from "../interface/CarData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<CarData[]> => {
  const response = axios.get(API_URL + '/cars');
  console.log((await response).data);
  return response;
}

export function useCarData() {
  const query = useQuery({
    queryFn:fetchData, 
    queryKey:  ['food-data'],
    retry: 2
  })

  return {
    ...query,
    data: query.data?.data
  }
}