import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Modal from './Modal';
import { ApiComponent } from 'apiComponent';

import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Searchbar from './Searchbar';
import './styles.css';
import Button from './Button/Button';

const apiComponent = new ApiComponent();

export default function App() {
  const [showModal, setshowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [currentInput, setCurrentInput] = useState('');
  const [currentImage, setCurrentImage] = useState("");
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);
  const [nothingFoundVisible, setNothingFoundVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiComponent.fetchImages("")
      .then(data => { setImages(data.hits) })
      .catch();
    setIsLoading(false);
    setLoadMoreIsVisible(true);
  }, []);

  const toggleModal = () => {
    setshowModal(!showModal);
  }

  const handleItemClick = (e) => {
    const imgSrc = e.target.src;
    const image = images.find(img => { return img.previewURL === imgSrc });
    setCurrentImage(image);
    setshowModal(true);
  }

  const onClickSubmit = async evt => {
    evt.preventDefault();

    apiComponent.page = 1;
    var imagesTemp;

    await apiComponent.fetchImages(query)
      .then(data => { setImages(data.hits); imagesTemp = data.hits })
      .catch();
    setIsLoading(false);
    setNothingFoundVisible(true);
    setCurrentInput(query);

    if (imagesTemp.length === 0) {
      setLoadMoreIsVisible(false);
      setNothingFoundVisible(true);
    } else
      if (imagesTemp.length < 20) {
        setLoadMoreIsVisible(false);
        setNothingFoundVisible(false);
      } else {
        setLoadMoreIsVisible(true);
        setNothingFoundVisible(false);
      }


  }

  const onHandleLoadMore = async () => {
    apiComponent.page = apiComponent.page + 1;
    setLoadMoreIsVisible(false);
    setIsLoading(true);
    var totalHits;

    await apiComponent.fetchImages(currentInput)
      .then(data => { setImages([...images, ...data.hits]); totalHits = data.totalHits })
      .catch();

    if (apiComponent.page >= totalHits / apiComponent.limit) {
      setLoadMoreIsVisible(false)
    } else setLoadMoreIsVisible(true);

    setIsLoading(false);

  }

  return (<div>
    <Searchbar findImage={evt => setQuery(evt.target.value)} onClickSubmit={onClickSubmit} />
    {showModal && <Modal image={currentImage} toggleModal={toggleModal} />}
    <ImageGallery onClick={handleItemClick} images={images}>
      {
        images.map(
          image => {
            return (<ImageGalleryItem key={image.id} id={image.id} url={image.previewURL} tags={image.tags} />);
          })
      }
    </ImageGallery>
    {isLoading && <Loader />}
    {nothingFoundVisible && <div className='nothing-found'><p>Nothing found :(</p></div>}
    {loadMoreIsVisible && <Button loadMore={onHandleLoadMore} />}
  </div>
  );

}
