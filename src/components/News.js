import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

export class News extends Component {

  constructor(){
    super()
    this.state = {
      articles : [],
      page : 1,
      totalResults : 0,
      loading : false
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d&page=${this.state.pageSize - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({
      articles: parseData.articles,
      page: this.state.page - 1,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  handleNextClick = async () => {
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/20))) {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading: true})
      let data = await fetch(url)
      let parseData = await data.json()
      this.setState({
        articles: parseData.articles,
        page: this.state.page + 1,
        totalResults: parseData.totalResults,
        loading: false
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center">Daily News - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {
            !this.state.loading && this.state.articles.map((data) => {
              return <div className="col-md-4" key={data.url?data.url:''}> <NewsItem title={data.title ? data.title.slice(0, 40):""} description={data.description?data.description.slice(0, 85):""} imageUrl={data.urlToImage?data.urlToImage:""} newsUrl={data.url?data.url:''}/></div>
            })
          }
        </div>
        <div className="container d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick} type='previous'>&larr; Previous</button>
          <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} onClick={this.handleNextClick} type='next'>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News