const SearchHistoryList = ({searchHistoryList}) => {
    return searchHistoryList.map(searchItem => searchItem.text).join(', ')
}

export default SearchHistoryList