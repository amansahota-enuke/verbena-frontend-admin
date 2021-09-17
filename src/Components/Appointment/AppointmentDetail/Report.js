import React from "react";

function Report({ oldReports }) {

    async function downloadFile(fileSrc, fileName) {
        const file = await fetch(fileSrc);
        const fileBlog = await file.blob();
        const fileURL = URL.createObjectURL(fileBlog);

        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            <h4 className="hepta-slab mb-4">Lab Test</h4>
            <div className="bg-white rounded-md mb-6">
                <div className="content">
                    {oldReports.map((report, index) => (
                        <div key={index} className="p-3 border-b-1 mb-3">
                            <div className="flex justify-between items-center">
                                <div className="">
                                    {report.name && (
                                        <h2 className="font-16 m-0 calibre-regular">
                                            <i className="fas fa-file mr-3"></i>
                                            {report.name}
                                        </h2>
                                    )}
                                </div>
                                <div className="relative">
                                    <button
                                        className="btn-reschedule px-3 py-2 rounded-full uppercase text-white primary-dim-bg-color mr-3"
                                        onClick={() =>
                                            downloadFile(
                                                process.env
                                                    .REACT_APP_API_SERVER_URL +
                                                    report.name,
                                                report.name
                                            )
                                        }
                                    >
                                        Download Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Report;
