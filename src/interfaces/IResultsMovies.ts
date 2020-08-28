export interface IMovie {
    id: string;
    title: string;
    image: string;
    year: number;
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
