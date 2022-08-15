import { useSearchParams } from "react-router-dom";

const Filters = (handleQuery) => {
    const [searchParams] = useSearchParams();

    const oldcoll = searchParams.get("oldcoll");
    const newcoll = searchParams.get("newcoll");

    if (oldcoll === null && newcoll === null) return null;

    return (
        <>
            <div className="containerr px-3 px-md-5">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-2">
                            <small>Current Filter:</small>
                        </div>
                        <div className="d-flex flex-wrap justify-content-start align-items-center g-2 w-100 filter_wrapper">
                            {oldcoll !== null && (
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="bi-x me-2"></i>
                                    <span>Old Collection: {oldcoll}</span>
                                </button>
                            )}
                            {newcoll !== null && (
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="bi-x me-2"></i>
                                    <span>New Collection: {newcoll}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </>
    );
};

export default Filters;
