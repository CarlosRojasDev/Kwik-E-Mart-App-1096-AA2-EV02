export default function Navbar() {
  return (    
    <div>
      <nav className="navbar navbar-dark bg-success">
        <div className="container-fluid justify-content-start">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="text-light ms-2">Menu</span>
        </div>
      </nav>
      <div className="collapse position-absolute w-100" style={{zIndex:"10"}} id="navbarToggleExternalContent">
        <div className="bg-success p-4 text-light">          
          <a className="nav-link" href="/admin">
            Admin
          </a>          
          <a className="nav-link" href="/">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}
