import axios from 'axios';
import Notiflix from 'notiflix';

export class ApiComponent {
  #URL = 'https://pixabay.com/api/?';
  #KEY = '38590711-cd4e1138b2603dfebaf6d7de9';

  limit = 20;
  page = 1;

  baseSearchParams = {
    key: this.#KEY,
    per_page: this.limit,
  };

  fetchImages(query) {
    const searchParams = new URLSearchParams({
      ...this.baseSearchParams,
      q: query,
      page: this.page,
    });
    return axios
      .get(`${this.#URL + searchParams.toString()}`)
      .then(resp => {
        console.log(searchParams.toString());
        return resp.data;
      })
      .catch(err =>
        Notiflix.Report.failure(
          'Server Error!',
          'There is something wrong..',
          'Okaaay'
        )
      );
  }
}
