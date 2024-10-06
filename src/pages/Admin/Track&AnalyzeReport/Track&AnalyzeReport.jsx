import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../../components/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/Admin/SuccessAlert/SuccessAlert.jsx";

const TrackAndAnalyzeReport = () => {
    const location = useLocation();
}

export default TrackAndAnalyzeReport;