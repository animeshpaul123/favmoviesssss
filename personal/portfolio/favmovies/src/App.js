import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Link } from 'react-router-dom';
import { Dropdown, Icon, Loader, Alert } from 'rsuite';
import Card from './card';
import axios from 'axios'

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

  // const id = local.some(({ imdbID }) => imdbID === data.imdbID)
  // console.log("222222222222222222222", id)
  // if (id) {
  //   for (let item of local) {
  //     if (item.imdbID === data.imdbID) {
  //       item = data
  //     }
  //   }
  // }
  // else {
  //   local.push(data)
  // }
  // window.localStorage.setItem("favs", JSON.stringify(local))
}
const getFavs = (data, localData) => {
  const a = {}
  for (let item of localData) {
    if (item.isFav) {
      a[item.imdbID] = true
    }
  }
  const b = []
  for (let item of data) {
    if (item.imdbID in a) {
      b.push({
        ...item,
        isFav: true
      })
    }
    else {
      b.push({
        ...item,
        isFav: false
      })
    }
  }
  return b
}
function App(props) {
  const storage = JSON.parse(window.localStorage.getItem("favs"))

  const [search, setsearch] = useState('war')
  const [results, setresults] = useState(null)
  const [loading, setloading] = useState(false)
  const [Selected, setSelected] = useState('Movie')

  const onChange = (e) => {
    setsearch(e.target.value)
  }
  const onSubmitSearch = (e) => {
    e.preventDefault()

  }
  const onClickSearch = () => {
    setloading(true)
    axios.get(`http://www.omdbapi.com/?s=${search}&type=${Selected.toLowerCase()}&apikey=44a4d11c&page=1`)
      .then(({ data }) => {
        if (data.Response == "True") {
          console.log("data => ", data)
          if (storage && Array.isArray(storage) && storage.length) {
            const items = getFavs(data.Search, storage)
            setresults(items)
          }
          else {
            setresults(data.Search.map(each => ({ ...each, isFav: false })))
          }
          setloading(false)
        }

      })
      .catch(e => {
        Alert.warning(e)
      })

  }
  useEffect(() => {
    search.length && onClickSearch()
    return () => {
    }
  }, [search])

  useEffect(() => {
    console.log("got", results)
    return () => {
    }
  }, [results])

  const select = (e, a) => setSelected(e)

  const markFav = (obj, isFav) => {
    console.log("sssssssssssssss", obj)

    const mappedRes = results.map(each => {
      return {
        ...each,
        isFav: obj.imdbID === each.imdbID ? isFav : each.isFav
      }
    })
    console.log("sssssssssssssss", mappedRes, obj)
    setresults(mappedRes)
    syncStorage(mappedRes, obj, isFav)
  }

  return (
    <div className="App">
      <div className="header">
        <div className="logo">Movie Mania</div>
        <div className="favourites">
          <Link to="/favs">Favourites</Link>
        </div>
      </div>
      <div className="main">
        <div className="search-wrapper">
          <div className="search-inner">
            <form onSubmit={onSubmitSearch}>
              <input type="text" placeholder="search for a movie" className="default-input" value={search} onChange={onChange} />
              <Dropdown title={Selected} activeKey={Selected} onSelect={select}>
                <Dropdown.Item eventKey="Movie" >Movies</Dropdown.Item>
                <Dropdown.Item eventKey="Series">Series</Dropdown.Item>
              </Dropdown>
              <span className="search-icon" onClick={onClickSearch}>
                <Icon icon="search" />
              </span>
            </form>
          </div>
        </div>
        {
          !loading && !results
            ? <div className="loading-wrapper">
              <p>Search for a movie</p>
            </div>
            : !loading && results && results.length
              ? <div className="main-content">
                {
                  results.map(each => {
                    return <Card key={each.imdbID} {...each} markFav={markFav} data={each} />
                  })
                }
              </div>
              : !loading && results && !results.length
                ? <div className="main-content">No results found for "{search}"</div>
                : <div className="loading-wrapper">
                  <Loader content="loading..." />
                </div>
        }
      </div>
    </div>
  );
}

export default App;
