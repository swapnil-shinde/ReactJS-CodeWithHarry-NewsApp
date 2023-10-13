import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super()
    this.state = {
      articles : [] 
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e760515997ae45cd8804bb2f647a266d"
    let data = await fetch(url)
    let parseData = await data.json()
    this.setState({articles: parseData.articles})
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
      </div>
    )
  }
}

export default News