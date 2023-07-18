import { Component } from 'react';
import css from './App.module.css';
import { fetchImages } from '../services/api';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Notiflix from 'notiflix';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchValue: '',
    currentPage: 1,
    per_page: 12,
    isOpen: false,
    largeImageURL: 'largeImageURL',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue, images: [], currentPage: 1 });
  };

  onOpenModal = largeImageURL => {
    this.setState({ isOpen: true, largeImageURL: largeImageURL });
  };

  onCloseModal = () => {
    this.setState({ isOpen: false });
  };

  componentDidUpdate(_, prevState) {
    const { currentPage, searchValue } = this.state;
    if (
      currentPage !== prevState.currentPage ||
      searchValue !== prevState.searchValue
    ) {
      this.setState({ isLoading: true });
      fetchImages(searchValue, currentPage)
        .then(({ hits, totalHits }) => {
          console.log({ hits, totalHits });
          if (hits.length === 0) {
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            isButtonShown:
              currentPage < Math.ceil(totalHits / this.state.per_page),
          }));
        })
        .catch(error => this.setState({ error: error.message }))
        .finally(() => this.setState({ isLoading: false }));
    }
    return;
  }

  onLoadMore = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} onClick={this.onOpenModal} />
        {this.state.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            largeImageURL={this.state.largeImageURL}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isButtonShown && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}
