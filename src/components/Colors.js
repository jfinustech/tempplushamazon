const md = (image) => {
    if (image === "" || typeof image === "undefined") return;
    const image_src = image.replace("/m/300/300/", "/l/0/0/");
    const div = document.createElement("div");
    div.classList = "modalwrapper text-white modalwrapper_close";
    div.setAttribute(
        "style",
        "z-index: 10000; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center"
    );
    div.textContent = "Loading....";

    const closebtn = document.createElement("a");
    closebtn.href = "void();";
    closebtn.classList =
        "border border-white border-1 d-flex justify-content-center align-items-center position-absolute bg-white text-decoration-none modalwrapper_close";
    closebtn.innerHTML = "&#10006;";
    closebtn.setAttribute(
        "style",
        "width: 40px; height: 40px; border-radius: 50%; right: 30px; top: 30px;"
    );
    div.appendChild(closebtn);

    // document.body.classList = "overflow-hidden";
    document.body.appendChild(div);

    const addimage = new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = new Image();
            img.src = image_src;
            img.className = "img-fluid";
            img.setAttribute("style", "max-height: 90vh; max-width: 90vw;");
            img.onload = img ? resolve(img) : reject(console.log);
        }, 500);
    });

    const remove_modal = () => {
        div.addEventListener("click", (e) => {
            if (e.target.classList.contains("modalwrapper_close")) {
                e.preventDefault();
                div.removeEventListener("click", null);
                div.remove();
                // document.body.classList = "";
            }
        });
    };

    addimage.then((img) => {
        div.removeChild(div.firstChild);
        div.appendChild(img);
        remove_modal();

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                div.remove();
                // document.body.classList = "";
            }
            document.removeEventListener("keydown", null);
        });
        document.addEventListener("scroll", () => {
            div.remove();
            // document.body.classList = "";
            document.removeEventListener("scroll", null);
        });
    });
};

const dateformetter = (date) => {
    const newdate = new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    return newdate;
};

const Colors = ({ colors, designID }) => {
    return colors?.map((color, ind) => (
        <div className="d-flex flex-column mb-5 mt-3 mt-md-0" key={ind}>
            <div className="d-flex justify-content-between align-items-center p-2 mb-3 border-bottom border-secondary  sticky-top bg-white">
                <h6
                    className=""
                    style={{ background: "white", top: 0, zIndex: 99 }}
                >
                    {color?.name} Color
                </h6>
                <small>{designID}</small>
            </div>

            <div
                className="d-flex flex-wrap justify-content-start align-items-center"
                style={{ gap: 50 }}
            >
                {color?.products?.map((product) => (
                    <div className="borderr p-2" key={product.sku}>
                        <div className="d-block text-center">
                            <img
                                src={
                                    !product.image_sm
                                        ? "/images/placeholder_sm.jpg"
                                        : product.image_sm
                                }
                                className="img-fluid image-thumb mb-3 cursor-pointer"
                                alt={product.sku}
                                onClick={() =>
                                    md(
                                        !product.image_lg
                                            ? "/images/placeholder_lg.jpg"
                                            : product.image_lg
                                    )
                                }
                            />
                            <small className="d-flex">SKU: {product.sku}</small>
                            <small className="d-flex">
                                DID: {product.designid}
                            </small>
                            <small className="d-flex">
                                Shape: {product.shape}
                            </small>
                            <small className="d-flex">
                                Size: {product.size}
                            </small>
                            <small className="d-flex">
                                Date Added: {dateformetter(product.import_date)}
                            </small>

                            <div className="d-flex justify-content-center pt-2 mt-3 border-top">
                                <span className="text-muted me-2">QTY:</span>
                                <span
                                    className={
                                        parseInt(product.qty) <= 0
                                            ? "text-danger"
                                            : ""
                                    }
                                >
                                    {product.qty}
                                </span>
                            </div>
                            <div className="pt-2 mt-3 border-top">
                                <small className="d-flex justify-content-evenly align-items-center">
                                    <a
                                        href={`https://uniqueloom.com/rugs/rug?SkuNo=${
                                            product?.sku?.split("-")[0]
                                        }`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="d-flex justify-content-center align-items-center text-decoration-none btn btn-sm btn-outline-secondary w-100 border-0 rounded-0 border-end"
                                        style={{ fontSize: 14 }}
                                    >
                                        <span>UL</span>

                                        <i
                                            className="bi-link-45deg ms-2"
                                            style={{ fontSize: 15 }}
                                        ></i>
                                    </a>
                                    <a
                                        href={`https://www.rugpal.com/store/q/?q=${product?.sku}-7600`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="d-flex justify-content-center align-items-center text-decoration-none btn btn-sm btn-outline-secondary w-100 border-0 rounded-0"
                                        style={{ fontSize: 14 }}
                                    >
                                        <span>RP</span>

                                        <i
                                            className="bi-link-45deg ms-2"
                                            style={{ fontSize: 15 }}
                                        ></i>
                                    </a>
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ));
};

export default Colors;
