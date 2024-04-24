import React, { useState, useEffect } from 'react';

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState('action');
  const apiKey = 'd7341002'; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Search) {
          setMovies(data.Search); 
        }
      } catch (error) {
        console.error('Error en el Fetch de Peliculas:', error);
      }
    };

    fetchMovies(); 
  }, [keyword, apiKey]); 

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.elements.searchInput.value.trim());
  };

  return (
    <div className="container-fluid">
      {apiKey !== '' ? (
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Formulario de búsqueda */}
              <form onSubmit={handleSearch}>
                <div className="form-group">
                  <label htmlFor="searchInput">Buscar por título:</label>
                  <input type="text" className="form-control" id="searchInput" />
                </div>
                <button type="submit" className="btn btn-info">Buscar</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Películas para la palabra: {keyword}</h2>
            </div>
            {/* Listado de películas */}
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div className="col-sm-6 col-md-3 my-4" key={index}>
                  <div className="card shadow mb-4">
                    <div className="card-header py-3">
                      <h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
                    </div>
                    <div className="card-body">
                      <div className="text-center">
                        <img
                          className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                          src={movie.Poster}
                          alt={movie.Title}
                          style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                        />
                      </div>
                      <p>{movie.Year}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-warning text-center">No se encontraron películas</div>
            )}
          </div>
        </>
      ) : (
        <div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
      )}
    </div>
  );
}

export default SearchMovies;