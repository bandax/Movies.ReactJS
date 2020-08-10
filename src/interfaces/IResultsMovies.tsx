export interface IMovie {
    id: string,
    title: string,
    image: string,
    year: number,
    categories: ICategory[]
}

export interface ICategory {
    id: string, 
    name: string
}

export interface IResultsMovie {
    total: number,   
    movies: IMovie[]
}

export interface IResultsMovieProps {
    title: string,
    resultsMovies: IResultsMovie,    
}


export interface IDetailsMovieProps {
    movie: IMovie   
}
