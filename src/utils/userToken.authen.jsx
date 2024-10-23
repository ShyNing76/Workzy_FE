import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const extractToken = (bearerToken) => {
  if (!bearerToken) {
    return "";
  }

  if (bearerToken.startsWith("Bearer ")) {
    // Sửa lại slide thành slice
    return bearerToken.split(" ")[1];
  }

  return bearerToken;
};
