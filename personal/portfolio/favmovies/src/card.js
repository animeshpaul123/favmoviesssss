import React from 'react'
import './card.scss'
import { Button } from 'rsuite'
import { Link } from 'react-router-dom'

function Card(props) {
    const { Title, Year, Poster, markFav, isFav, imdbID, Type, data, hideButton } = props
    console.log(isFav)
    return (
        <div className="card">
            <Link to={`/${Type}/${imdbID}`}>
                <div className="img-wrapper">
                    <img src={Poster} alt={Title} />
                </div>
            </Link>
            <div className="content">
                <p className="title">{Title}</p>
                <p className="release-date">{Year}</p>
                {
                    !hideButton
                        ? <Button color={isFav ? "red" : "blue"} onClick={() => markFav(data, !isFav)}>{isFav ? "remove" : "mark as favourite"}</Button>
                        : null
                }

            </div>
        </div>
    )
}

export default Card