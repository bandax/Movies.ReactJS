export interface IMovie {
    id: string;
    title: string;
    image: string;
    year: number;
    categories: ICategory[];
}

export interface ICategory {
    id: string; 
    name: string;
}

export interface IResultsMovieProps {    
    resultsMovies: IMovie[];    
}


export interface IDetailsMovieProps {
    movie: IMovie;   
}
