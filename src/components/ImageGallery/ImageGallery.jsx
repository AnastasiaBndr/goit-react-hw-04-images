const ImageGallery = (props) => {
    return (<ul className="ImageGallery" onClick={props.onClick}>
        {props.children}
    </ul>)
}

export default ImageGallery;