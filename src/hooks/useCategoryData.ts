import axios, { AxiosPromise } from "axios"
import { CategoryData } from "../interface/CategoryData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const fetchData = async (): AxiosPromise<CategoryData[]> => {
  const response = axios.get(API_URL + '/categories');
  return response;
}

export function useCategoryData() {
  const query = useQuery({
    queryFn:fetchData, 
    queryKey:  ['category-data'],
    retry: 2
  })

  return {
    ...query,
    categories: query.data?.data
  }
}