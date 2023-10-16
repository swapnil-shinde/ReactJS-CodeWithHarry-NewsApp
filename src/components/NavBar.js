import React, { Component } from 'react'

export class NavBar extends Component {

  render() {

    // var myDropdown = document.querySelector('.dropdown');

    // myDropdown ? myDropdown.addEventListener('click', function (event) {
    //   if (event.target.classList.contains('dropdown-item')) {
    //     alert('Item clicked: ' + event.target.textContent);
    //   }
    // }) : ""

    return (
      <div>
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
          <div className="container-fluid d-flex justify-content-between">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{width:'75%'}}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">business</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">entertainment</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">general</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">health</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">science</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">sports</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">technology</a>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" >
                    India
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark" onClick={this.props.handleCountry}>
                    <li><a className="dropdown-item" href="#">India</a></li>
                    <li><a className="dropdown-item" href="#">United States</a></li>
                    <li><a className="dropdown-item" href="#">Canada</a></li>
                    <li><a className="dropdown-item" href="#">United Kingdom</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar