const Button = ({ loadMore }) => {
    return (<div>
        <button className="Button" onClick={loadMore} type="button">Load More</button>
    </div>)
}

export default Button;