export interface IMovie {
  id: number;
  title: string;
  image: string;
  year: number;
  rate: number;
  categories: ICategory[];
  releaseDate: string;
  review: string;
  url: string;
  runtime: string;
}

export interface ICategory {
  id: string;
  name: string;
}
