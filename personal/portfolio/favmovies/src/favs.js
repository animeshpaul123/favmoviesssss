import React, { useState } from 'react'
import Card from './card'
import './card.scss'

const syncStorage = (maindata, data, isFav) => {
    const local = JSON.parse(window.localStorage.getItem("favs")) || []
    if (!isFav) {
        return window.localStorage.setItem("favs", JSON.stringify(local.filter(each => each.imdbID !== data.imdbID)))
    }
    else {
        data.isFav = true
        local.push(data)
        window.localStorage.setItem("favs", JSON.stringify(local))
    }
}

function Favs(props) {
    const storage = JSON.parse(window.localStorage.getItem("favs"))
    const [results, setresults] = useState(storage)
    const markFav = (obj, isFav) => {
        syncStorage("", obj, isFav)
    }
    return (
        <div className="favs-wrapper" style={{ maxWidth: "1300px", margin: "60px auto 0" }}>
            {
                <div className="main-content">
                    {
                        results && results.length
                            ? results.map(each => {
                                return <Card key={each.imdbID} {...each} data={each} markFav={markFav} hideButton={true} />
                            })
                            : <p>No movies in your favourite list</p>
                    }
                </div>
            }
        </div>
    )
}

export default Favs
