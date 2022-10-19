import { Link } from 'react-router-dom'

const Nav = ({ searchParams }) => {
    return (
        <div className="containerr px-3 px-md-5">
            <div className="row">
                <div className="col-12">
                    <header className="my-3 d-flex justify-content-between">
                        <Link to="/" className="text-decoration-none text-dark">
                            <h4 className="m-0 p-0">RP-OS Products</h4>
                        </Link>
                        <h4 className="m-0 p-0">
                            <span className="text-muted fw-light">Page: </span>{' '}
                            {searchParams.get('page') ?? 1}
                        </h4>
                    </header>
                </div>
            </div>
        </div>
    )
}

export default Nav
