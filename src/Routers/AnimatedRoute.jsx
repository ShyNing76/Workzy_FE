import React from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./AnimatedRoute.scss";

const AnimatedRoute = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300} // Thời gian cho hiệu ứng
      >
        <Outlet />
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedRoute;
