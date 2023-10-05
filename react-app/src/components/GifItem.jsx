const GifItem = ({ gifItem }) => {
    return <img src={gifItem.images.preview_gif.url} style={{ maxWidth: 200, maxHeight: 150 }} />
}

export default GifItem