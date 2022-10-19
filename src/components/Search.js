import { useSearchParams } from 'react-router-dom'

const Search = ({ searchvalue, setSearchvalue }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <>
            <div className="containerr px-3 px-md-5">
                <div className="row">
                    <div className="col-12">
                        <form>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    aria-label="Search..."
                                    aria-describedby="button-addon2"
                                    name="search"
                                    autoComplete="off"
                                    value={searchvalue}
                                    onChange={e =>
                                        setSearchvalue(e.target.value)
                                    }
                                />
                                {searchParams.get('search') === '' ||
                                searchParams.get('search') === null ||
                                searchParams.get('search') === undefined ? (
                                    <button
                                        className="btn border-1 bg-transparent"
                                        type="submit"
                                        id="button-addon2"
                                    >
                                        <i className="bi-search"></i>
                                    </button>
                                ) : (
                                    <button
                                        className="btn border-1 bg-transparent"
                                        type="button"
                                        id="button-addon2"
                                        onClick={() => {
                                            setSearchvalue('')
                                            searchParams.delete('search')
                                            setSearchParams(searchParams)
                                        }}
                                    >
                                        <i className="bi-x"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Search
