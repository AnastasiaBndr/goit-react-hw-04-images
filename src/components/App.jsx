import React, { Component } from 'react';
import Loader from './Loader';
import Modal from './Modal';
import axios from "axios";
import { PropTypes } from 'prop-types';

import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Searchbar from './Searchbar';
import './styles.css';
import Button from './Button/Button';

const URL = "https://pixabay.com/api/?";
const KEY = "key=38590711-cd4e1138b2603dfebaf6d7de9";
export class App extends Component {

  state = {
    showModal: false,
    fullLink: "",
    images: [],
    isLoading: false,
    query: "",
    page: 1,
    currentInput: '',
    perpage: 20,
    currentImage: "",
    loadMoreIsVisible: false,
    nothingFoundVisible: false
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !this.state.showModal }));
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await axios.get(URL + KEY + this.state.query);
    this.setState({
      images: response.data.hits,
      isLoading: false,
      loadMoreIsVisible: true
    });

  }

  handlequery = evt => {
    this.setState({ query: "&q=" + evt.target.value });
  }

  onClickSubmit = async evt => {
    evt.preventDefault();

    await this.setState({page:1});

    const response = await axios.get(URL + KEY + this.state.query + "&page=" + this.state.page + "&per_page=" + this.state.perpage);

    this.setState({
      images: response.data.hits,
      isLoading: false,
      nothingFoundVisible: false,
      currentInput: this.state.query
    });

    console.log(response.data.totalHits);

    if (response.data.totalHits === 0) {
      this.setState({ loadMoreIsVisible: false, nothingFoundVisible: true });
    } else
      if (response.data.totalHits <= 20) {
        this.setState({ loadMoreIsVisible: false })
      } else this.setState({ loadMoreIsVisible: true })

  }

  onHandleLoadMore = async () => {

    const { page, currentInput } = this.state;
    await this.setState(() => { return { page: page + 1 } });
    await this.setState({isLoading:true, loadMoreIsVisible:false});
    const response = await axios.get(URL + KEY + currentInput + "&page=" + this.state.page);
    const newArr = this.state.images;
    newArr.push(...response.data.hits);

    if (this.state.page >= response.data.totalHits / this.state.perpage) {
      this.setState({ loadMoreIsVisible: false })
    }else this.setState({loadMoreIsVisible:true});

    this.setState({
      images: newArr,
      isLoading: false,
    });


  }

  handleItemClick = (evt) => {

    const { images } = this.state;
    const imgSrc = evt.target.src;
    const image = images.find(img => { return img.previewURL === imgSrc });
    this.setState({ currentImage: image, showModal: true });
  }

  render() {


    return (<div>
      <Searchbar findImage={this.handlequery} onClickSubmit={this.onClickSubmit} />
      {this.state.showModal && <Modal image={this.state.currentImage} toggleModal={this.toggleModal} />}
      <ImageGallery onClick={this.handleItemClick} images={this.state.images}>
        {
          this.state.images.map(
            image => {
              return (<ImageGalleryItem key={image.id} id={image.id} url={image.previewURL} tags={image.tags} />);

            })
        }
      </ImageGallery>
      {this.state.isLoading && <Loader />}
      {this.state.nothingFoundVisible && <div className='nothing-found'><p>Nothing found :(</p></div>}
      {this.state.loadMoreIsVisible && <Button loadMore={this.onHandleLoadMore} />}
    </div>);
  }
};

App.propTypes = {
  showModal: PropTypes.bool,
  fullLink: PropTypes.string,
  images: PropTypes.array,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  page: PropTypes.number,
  perpage: PropTypes.number,
  currentImage: PropTypes.string,
  loadMoreIsVisible: PropTypes.bool,
}

