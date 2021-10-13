import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const LeftMenu = ({ show }) => {
    useEffect(() => {
        $("a.multi-level").on("click", function (e) {
            $(".multi-level-menu").toggleClass("show");
            e.stopPropagation();
        });

        $("a.multi-level").on("click", function (e) {
            $(".arrow").toggleClass("rotate");
            e.stopPropagation();
        });
    }, []);

    return (
        <>
            <div
                className={`left-menu fixed left-0 h-screen p10 top-0 bg-white ${
                    show ? "expanded" : ""
                }`}
            >
                <div>
                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/dashboard"
                        title="Patient Dashboard"
                    >
                        <span className="icon sprite-menu dashboard"></span>
                        <span className="title uppercase">Dashboard</span>
                    </Link>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/appointments"
                        title="Appointments"
                    >
                        <span className="icon sprite-menu appointment"></span>
                        <span className="title uppercase">Appointments</span>
                    </Link>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/providers"
                        title="Provider"
                    >
                        <span className="icon sprite-menu provider"></span>
                        <span className="title uppercase">Providers</span>
                    </Link>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/patients"
                        title="Patient"
                    >
                        <span className="icon sprite-menu patient"></span>
                        <span className="title uppercase">Patients</span>
                    </Link>

                    <Link
                        className="block border-b-1 p-2 caliber-regular"
                        to="/home/payments"
                        title="Payment"
                    >
                        <span className="icon sprite-menu payment"></span>
                        <span className="title uppercase">Payments</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LeftMenu;
