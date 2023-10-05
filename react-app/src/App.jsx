import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import GifResultList from './components/GifResultList'
import SearchHistoryList from './components/SearchHistoryList'

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [lastSearchTerm, setLastSearchTerm] = useState("")
  const [searchHistoryList, setSearchHistoryList] = useState([])
  const [gifResultList, setGifResultList] = useState([])
  const [currentOffset, setCurrentOffset] = useState(0)

  const RESULTS_PER_PAGE = 10

  useEffect(() => {
    loadSearchHistory()
  }, [gifResultList])

  const loadSearchHistory = async () => {
    const response = await axios.get('http://localhost:3001')
    setSearchHistoryList(response.data)
  }

  const storeSearchHistory = async () => {
    await axios.post('http://localhost:3001/searchHistory', { text: searchTerm })
  }

  const deleteAllSearchHistory = async () => {
    await axios.delete('http://localhost:3001/searchHistory')
    loadSearchHistory()
  }

  const executeSearchThroughButtonClick = () => {
    clearPreviousResults()
    storeSearchHistory()
    executeSearch(searchTerm)
  }

  const clearPreviousResults = () => {
    setGifResultList([])
    setCurrentOffset(0)
  }

  const executeSearch = async (text) => {
    setLastSearchTerm(text)
    const params = { params: { api_key: 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa', q: text, offset: currentOffset, limit: RESULTS_PER_PAGE } }
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', params)
    setGifResultList(gifResultList => [...gifResultList, ...response.data.data])
  }

  const loadNextResults = () => {
    setCurrentOffset(currentOffset => currentOffset + RESULTS_PER_PAGE)
    executeSearch(lastSearchTerm)
  }

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <h1>Search Gifs</h1>
        <div style={{ marginBottom: '10px' }}><input onChange={event => setSearchTerm(event.target.value)} /></div>
        <button onClick={executeSearchThroughButtonClick}>Search</button>
        <button onClick={deleteAllSearchHistory} style={{color: 'red'}}>Delete history</button>
      </div>
      <div>
        Search History: <SearchHistoryList searchHistoryList={searchHistoryList} />
      </div>
      <GifResultList gifResultList={gifResultList} />
      <div>
        <button onClick={loadNextResults}>Load more</button>
      </div>
    </>
  )
}

export default App
