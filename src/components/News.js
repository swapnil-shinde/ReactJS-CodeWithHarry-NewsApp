import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: true
    }
  }

  async componentDidMount() {
    this.updateNews()
    document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`

  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e760515997ae45cd8804bb2f647a266d&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    })
  }

  fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e760515997ae45cd8804bb2f647a266d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
    })
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '30px 0px' }}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container my-3'>
            <div className="row">
              {
                this.state.articles.map((data) => {
                  return <div className="col-md-4" key={data.url ? data.url : ''}> <NewsItem title={data.title ? data.title.slice(0, 40) : ""} description={data.description ? data.description.slice(0, 85) : ""} imageUrl={data.urlToImage ? data.urlToImage : ''} newsUrl={data.url ? data.url : ''} author={data.author ? data.author : 'Unknown'} time={data.publishedAt ? data.publishedAt : 'Unknown Time'} source={data.source.name ? data.source.name : 'Unknown Source'} /></div>
                })
              }
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick} type='previous'>&larr; Previous</button>
          <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} onClick={this.handleNextClick} type='next'>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News