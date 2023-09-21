import SearchIcon from '../icons.svg';

const Searchbar = ({ findImage, onClickSubmit }) => {
    return (<header className="Searchbar">
        <form className="SearchForm" onSubmit={onClickSubmit}>
            <button type="button" className="SearchForm-button" onClick={onClickSubmit}>
                <span className="button-label">
                    <img src={SearchIcon} alt="Search" width="24" height="24" />
                </span>
            </button>

            <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={findImage}
            />
        </form>
    </header>)
}

export default Searchbar;