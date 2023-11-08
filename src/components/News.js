import React, { Component, useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResult] = useState(0)
  const [loading, setLoading] = useState(true)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // handlePrevClick = async () => {
  //   setPage(page - 1)
  //   updateNews()
  // }

  // handleNextClick = async () => {
  //   setPage(page + 1)
  //   updateNews()
  // }

  useEffect(() => {
    updateNews()
  }, [])

  const updateNews = async() => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(50);
    let parseData = await data.json()
    props.setProgress(70);
    setArticles(parseData.articles)
    setTotalResult(parseData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  const fetchMoreData = async() => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData);
    setArticles(articles.concat(parseData.articles))
    setTotalResult(parseData.totalResults)
  }

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px' }}>Daily News - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className='container my-3'>
          <div className="row">
            {
              articles.map((data) => {
                return <div className="col-md-4" key={data.url ? data.url : ''}> <NewsItem title={data.title ? data.title.slice(0, 40) : ""} description={data.description ? data.description.slice(0, 85) : ""} imageUrl={data.urlToImage ? data.urlToImage : ''} newsUrl={data.url ? data.url : ''} author={data.author ? data.author : 'Unknown'} time={data.publishedAt ? data.publishedAt : 'Unknown Time'} source={data.source.name ? data.source.name : 'Unknown Source'} /></div>
              })
            }
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
        <button className="btn btn-dark" disabled={page <= 1} onClick={handlePrevClick} type='previous'>&larr; Previous</button>
        <button className="btn btn-dark" disabled={page + 1 > Math.ceil(totalResults / 20)} onClick={handleNextClick} type='next'>Next &rarr;</button>
      </div> */}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News