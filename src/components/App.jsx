import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from './services/image-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const App = () => {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (query !== null) {
        const response = await fetchImages(query, page);
        if (response.totalHits === 0) {
          return Notiflix.Notify.warning('There are no results');
        }
        setItems(prevItems => [...prevItems, ...response.hits]);
        setStatus('resolved');
        setTotalHits(response.totalHits);
      }
    };
    fetchData();
  }, [query, page]);

  const onSubmit = inputData => {
    if (query === inputData.toLowerCase()) {
      return Notiflix.Notify.warning(`You are already watching "${query}"`);
    } else if (inputData === '') {
      return Notiflix.Notify.warning('Please enter a search text');
    }
    setQuery(inputData.toLowerCase());
    setItems([]);
    setPage(1);
    setTotalHits(0);
  };

  const onNextPageLoad = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('pending');
  };

  if (status === 'idle') {
    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={onNextPageLoad} />}
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery page={page} items={items} />
        {totalHits > 12 && totalHits > items.length && (
          <Button onClick={onNextPageLoad} />
        )}
      </div>
    );
  }
};

export default App;
