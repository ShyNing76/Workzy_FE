import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";

const ReviewsManagerPage = () => {
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Reviews</h1>
    </div>
  );
};

export default ReviewsManagerPage;
