import { createPortal } from "react-dom";
import React, { Component } from "react";


const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handlePress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handlePress);
    }

    handlePress = (e) => {
        if (e.code === 'Escape')
            this.props.toggleModal();
    }


    render() {

        const { image } = this.props;
        return createPortal(
            <div className="Overlay">
                <div className="Modal">
                    <button type="button" onClick={() => { this.props.toggleModal() }}>X</button>
                    <h4>{image.user}: <span>@{image.user_id}</span></h4>
                    <img width='500' loading="lazy" src={image.largeImageURL} alt={image.tags} />
                    <p className="tags"> {image.tags}</p>
                    <p>Views: {image.views} Likes: {image.likes} Comments: {image.comments}</p>
                </div>
            </div>, modalRoot
        )
    }

}