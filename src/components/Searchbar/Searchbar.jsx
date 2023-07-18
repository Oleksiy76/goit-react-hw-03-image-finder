import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleInputChange = event => {
    this.setState({ searchValue: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchValue.trim() === '') {
      Notiflix.Notify.warning('Please enter your search query!');
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            name="searchValue"
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
