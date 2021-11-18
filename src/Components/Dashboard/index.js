import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullWidthContainer } from "..";
import statusConstants from "../../constants/status.constants";
import selector from "../../redux/selector";
import { AppointmentActions } from "../../redux/slice/appointment.slice";
import { PatientActions } from "../../redux/slice/patient.slice";
import { ProviderActions } from "../../redux/slice/provider.slice";
import AppointmentTable from "./AppointmentTable";
import DashboardBox from "./DashboardBox";
import PatientTable from "./PatientTable";
import ProviderTable from "./ProviderTable";

const Dashboard = () => {
    const dispatch = useDispatch();
    const patientStatus = useSelector(selector.patientStatus);
    const providerStatus = useSelector(selector.providerStatus);
    const appointmentStatus = useSelector(selector.appointmentStatus);

    useEffect(() => {
        dispatch(PatientActions.fetchPatientList({
            sort:'DESC'
        }));
        dispatch(ProviderActions.fetchProviderList({
            sort:'DESC'
        }));
        dispatch(AppointmentActions.fetchAppointmentList({
            sort:'DESC'
        }));
    }, []);

    return (
        <FullWidthContainer>
            {(patientStatus || providerStatus || appointmentStatus) ===
                statusConstants.PENDING}
            <DashboardBox />
            <PatientTable />
            <ProviderTable />
            <AppointmentTable />
        </FullWidthContainer>
    );
};

export default Dashboard;
