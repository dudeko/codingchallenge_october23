import GifItem from "./GifItem"

const GifResultList = ({ gifResultList }) => {

    return gifResultList.map(gifItem => (<GifItem gifItem={gifItem} />))
}

export default GifResultList