import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super()
    this.state = {
      articles : [],
      page : 1,
      totalResults : 0
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d&page=1&pageSize=20"
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults
    })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d&page=${this.state.page - 1}&pageSize=20`
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      totalResults: parseData.totalResults
    })
  }

  handleNextClick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d&page=${this.state.page + 1}&pageSize=20`
      let data = await fetch(url)
      let parseData = await data.json()
      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        totalResults: parseData.totalResults
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>Daily News - Top Headlines</h2>
        <div className="row">
          {
            this.state.articles.map((data) => {
              return <div className="col-md-4" key={data.url?data.url:''}> <NewsItem title={data.title ? data.title.slice(0, 40):""} description={data.description?data.description.slice(0, 85):""} imageUrl={data.urlToImage?data.urlToImage:""} newsUrl={data.url?data.url:''}/></div>
            })
          }
        </div>
        <div className="container d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick} type='previous'>&larr; Previous</button>
          <button className="btn btn-dark" onClick={this.handleNextClick} type='next'>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News