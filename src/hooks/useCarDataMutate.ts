import axios, { AxiosPromise } from "axios"
import { CarDataPost } from "../interface/CarDataPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080'

const postData = async (data: CarDataPost): AxiosPromise<any> => {
  const response = axios.post(API_URL + '/cars', data);
  return response;
}

export function useCarDataMutate() {
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