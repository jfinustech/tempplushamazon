import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Colors from "./Colors";
import Pager from "./Pager";
import Loading from "./Loading";

const List = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(true);
    const [error, setError] = useState("testing");
    const [init, setInit] = useState(true);

    const handleQuery = (q) => {
        const new_query = {
            ...Object.fromEntries(searchParams.entries()),
            ...q,
        };
        setSearchParams(new_query);
    };

    const handleScroll = () => {
        // setTimeout(() => {
        window.scroll(0, 0);
        // }, 100);
    };

    useEffect(() => {
        setLoading(true);
        const ax = () => {
            axios({
                method: "post",
                url: "https://sandbx.rugpal.com/office/jay/d.asp",
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    page: searchParams.get("page") ?? 1,
                    newcoll: searchParams.get("newcoll") ?? "",
                    oldcoll: searchParams.get("oldcoll") ?? "",
                },
            })
                .then(function (res) {
                    try {
                        setResponse(res);
                        handleScroll();
                        setHasError(false);
                    } catch (error) {
                        setHasError(true);
                        setError(error.message);
                        // console.log(error);
                    } finally {
                        setInit(false);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setInit(false);
                    setLoading(false);
                    setHasError(true);
                    setError(error.message);
                });
        };
        ax();
    }, [searchParams]);

    return (
        <>
            {/* {loading && <Loading />} */}
            <div className="App">
                <div className="containerr px-3 px-md-5">
                    <div className="row">
                        <div className="col-12">
                            <header className="my-3 d-flex justify-content-between">
                                <h4 className="m-0 p-0">
                                    Plush/Amazon Products
                                </h4>
                                <h4 className="m-0 p-0">
                                    <span className="text-muted fw-light">
                                        Page:{" "}
                                    </span>{" "}
                                    {searchParams.get("page") ?? 1}
                                </h4>
                            </header>
                        </div>
                    </div>
                </div>
                <hr className="mt-0 mb-4" />

                <div
                    className={`containerr px-3 px-md-5 mb-5 ${
                        loading || init ? "isloading" : ""
                    }`}
                >
                    <div className="row g-0">
                        {init || loading ? (
                            // <div>Loading ....</div>
                            <Loading />
                        ) : hasError ? (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) : response?.data ? (
                            response?.data?.map((data) => (
                                <React.Fragment key={data.key.toString()}>
                                    <div className="col-12">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <div
                                                    style={{ top: 15 }}
                                                    className="d-flex flex-column sticky-top border-bottom pb-2"
                                                >
                                                    <h6 className="d-block">
                                                        {data.designID}
                                                    </h6>

                                                    <div className="pe-3">
                                                        <small className="d-flex">
                                                            <b>
                                                                Collection Name
                                                            </b>
                                                        </small>
                                                        <small>
                                                            <table className="m-0 p-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <td
                                                                            className="text-uppercase text-secondary"
                                                                            style={{
                                                                                width: 40,
                                                                            }}
                                                                        >
                                                                            Old:
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                data.old_collection_name
                                                                            }
                                                                        </td>
                                                                        {/* <td>
                                                                        <Link
                                                                            to={`?oldcoll=${data.old_collection_name}`}
                                                                        >
                                                                            {
                                                                                data.old_collection_name
                                                                            }
                                                                        </Link> 
                                                                    </td>*/}
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="text-uppercase text-secondary">
                                                                            New:
                                                                        </td>
                                                                        <td>
                                                                            {data.new_collection_name ===
                                                                            ""
                                                                                ? "N/A"
                                                                                : data.new_collection_name}
                                                                        </td>
                                                                        {/* <td>
                                                                        {data.new_collection_name ===
                                                                        ""
                                                                            ? "N/A"
                                                                            : `<a href="?newcoll=${data.new_collection_name}">${data.new_collection_name}</a>`}
                                                                    </td> */}
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </small>
                                                        <small className="d-flex mt-3">
                                                            <b>Description</b>
                                                        </small>
                                                        <small>
                                                            <div className="mt-2 text-uppercase text-secondary">
                                                                Old:
                                                            </div>
                                                            <div>
                                                                {
                                                                    data.old_description
                                                                }
                                                            </div>
                                                            <div className="mt-2 text-uppercase text-secondary">
                                                                New:
                                                            </div>
                                                            <div>
                                                                {data.new_description ===
                                                                ""
                                                                    ? "N/A"
                                                                    : data.new_description}
                                                            </div>
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8 pb-4 border-start ps-md-4">
                                                <Colors
                                                    colors={data?.colors}
                                                    designID={data?.designID}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-5 pb-2 mt-4 border-bottom">
                                        <small className="text-muted">
                                            End of design ID: {data.designID}
                                        </small>
                                    </div>
                                </React.Fragment>
                            ))
                        ) : (
                            <div>Nothing here!</div>
                        )}
                    </div>
                    {!init && !loading && (
                        <Pager
                            current_page={searchParams.get("page") ?? 1}
                            loading={loading}
                            handleQuery={handleQuery}
                            maxpage={
                                response?.data
                                    ? response?.data[0].total_page
                                    : 0
                            }
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default List;
