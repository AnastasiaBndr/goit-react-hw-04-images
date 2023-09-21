const ImageGalleryItem = ({ url, tags, id }) => {

    return (<li className="ImageGalleryItem" key={id}>
        <img className="ImageGalleryItem-image" src={url} alt={tags} />
    </li>)
}

export default ImageGalleryItem;