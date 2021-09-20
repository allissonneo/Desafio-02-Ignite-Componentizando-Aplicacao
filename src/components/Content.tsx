import { JSXElementConstructor, ReactElement, ReactNodeArray, ReactPortal, useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";
import '../styles/global.scss';
import '../styles/content.scss'

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content(props: { generoSelecionadoId: number; generoSelecionado: string; }) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.generoSelecionadoId}`).then(response => {
      setMovies(response.data);
  })}, [props.generoSelecionadoId])



  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.generoSelecionado}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}