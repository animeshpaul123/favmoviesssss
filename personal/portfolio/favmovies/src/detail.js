import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './detail.scss'
import { Icon } from 'rsuite'

function Detail(props) {
    console.log("sasdasdasdasdasdas", props)
    const [data, setdata] = useState(null)

    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?i=${props.match.params.id}&&apikey=44a4d11c`)
            .then(({ data }) => {
                setdata(data)
            })
        return () => {
        }
    }, [])
    const { Title, Year, Rated, Released, Genre, Writer, Actors, Plot, Poster } = data || {}
    return Poster ? <div className="movie-detail">
        <div className="movie-detail-inner">
            <span onClick={() => props.history.goBack()} style={{ cursor: "pointer" }}>
                <Icon icon="back-arrow" size="2x" />
            </span>
            <img src={Poster} alt="" />
            <p>{Genre}</p>
            <p>{Released}</p>
            <p>{Title}</p>
            <p>{Writer}</p>
            <p>{Actors}</p>
        </div>
    </div>
        : null
}

export default Detail