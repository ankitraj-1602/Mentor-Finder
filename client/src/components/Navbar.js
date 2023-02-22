import React from 'react'

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))

  function logout() {
    localStorage.removeItem('currentUser')
    window.location.href = '/home'
  }
  
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <a class="navbar-brand" href="/home">Mentor.io</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon" style={{ color: "white" }}><i class="fa fa-bars" aria-hidden="true"></i></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav">
            {user ? (
              <div class="dropdown " style={{ marginLeft: '80vw' }}>
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user" aria-hidden="true"></i>  {user.name}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                  <a class="dropdown-item" href="/profile">Profile</a>
                  <a class="dropdown-item" href="#" onClick={logout} >Logout</a>
                </div>
              </div>

            ) : (
              <>
                <li class="nav-item active" style={{ marginLeft: '80vw' }}>
                  <a class="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

