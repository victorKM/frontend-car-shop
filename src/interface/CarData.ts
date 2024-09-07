import { CategoryData } from "./CategoryData";

export interface CarData {
  id?: number,
  name: string,
  company: string,
  price: number,
  imageUrl: string,
  categories: CategoryData[],
  categoriesIds: number[],
}