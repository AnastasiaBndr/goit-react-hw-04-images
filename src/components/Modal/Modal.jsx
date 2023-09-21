import { createPortal } from "react-dom";
import React, { Component } from "react";

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    state = {
        isLoading: true,
        imageReplacer: '../image_not_found.png'
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handlePress);
    }

    loadImage = () => {
        const { image } = this.props;
        const img = new Image();
        img.src = image.largeImageURL;
        img.onload = () => {
            this.setState({ isLoading: false });
        };
        img.onerror = () => {
            this.setState({ isLoading: false });
        };
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlePress);
    }

    handlePress = (e) => {
        if (e.code === 'Escape')
            this.props.toggleModal();
    }


    render() {

        const { image, toggleModal } = this.props;
        const { isLoading, imageReplacer } = this.state;

        this.loadImage();
        return createPortal(
            <div className="Overlay">
                <div className="Modal">
                    <button type="button" onClick={() => { toggleModal() }}>X</button>
                    <h4>{image.user}: <span>@{image.user_id}</span></h4>

                    {isLoading ? (<>
                        <img width={image.webformatWidth} height={image.webformatHeight} src={imageReplacer} alt={image.tags} />
                        <p className="tags"> {image.tags}</p>
                        <p>Views: {image.views} Likes: {image.likes} Comments: {image.comments}</p>
                    </>
                    ) : (<>
                        <img width={image.webformatWidth} loading="lazy" src={image.largeImageURL} alt={image.tags} />
                        <p className="tags"> {image.tags}</p>
                        <p>Views: {image.views} Likes: {image.likes} Comments: {image.comments}</p>
                    </>)}
                </div>
            </div>, modalRoot
        )
    }

}