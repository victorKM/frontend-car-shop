import axios, { AxiosPromise } from "axios"
import { CategoryData } from "../interface/CategoryData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async (data: CategoryData): AxiosPromise<any> => {
  const response = axios.post(API_URL + '/categories', data);
  return response;
}

export function useCategoryDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData, 
    retry: 2, 
    onSuccess: () => {
        queryClient.invalidateQueries();
    }
  })

  return mutate;
}