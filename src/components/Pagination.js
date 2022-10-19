import { useState } from 'react'

const Pagination = ({ loading, current_page, maxpage, handleQuery }) => {
    const [inputval, setInputval] = useState(
        current_page === '' ? 1 : current_page
    )

    const handleInput = (e) => {
        setInputval(e.target.value)
        const timeout = setTimeout(() => {
            handleQuery({
                page:
                    e.target.value < 1
                        ? 1
                        : e.target.value > maxpage
                        ? maxpage
                        : e.target.value,
            })
        }, 250)

        return () => clearTimeout(timeout)
    }

    return (
        <>
            {maxpage > 0 && (
                <div className="row mt-5">
                    <div className="col text-center">
                        <div className="btn-group mt-3" role="group">
                            <button
                                type="button"
                                className="paging-btn btn btn-lg border-0 rounded-0 rounded-start btn-outline-secondary user-select-none"
                                onClick={() =>
                                    handleQuery({
                                        page:
                                            parseInt(current_page) <= 1
                                                ? 1
                                                : parseInt(current_page) - 1,
                                    })
                                }
                                disabled={
                                    loading === true ||
                                    parseInt(current_page) === 1
                                        ? true
                                        : false
                                }
                            >
                                <i className="bi-chevron-left"></i>
                            </button>

                            <input
                                className="paging-inp text-center py-2 m-0 pager"
                                type="number"
                                step="1"
                                min="1"
                                value={inputval}
                                onChange={(e) => handleInput(e)}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="paging-btn btn btn-lg border-0 rounded-0 rounded-end btn-outline-secondary user-select-none"
                                onClick={() =>
                                    handleQuery({
                                        page:
                                            parseInt(current_page) ===
                                            parseInt(maxpage)
                                                ? maxpage
                                                : parseInt(current_page) + 1,
                                    })
                                }
                                disabled={
                                    loading ||
                                    parseInt(current_page) === parseInt(maxpage)
                                }
                            >
                                <i className="bi-chevron-right"></i>
                            </button>
                        </div>
                        <div className="d-block">
                            <small>Max Page: {maxpage}</small>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Pagination
