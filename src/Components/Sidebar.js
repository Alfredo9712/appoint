import {
  Create,
  Home,
  EventAvailable,
  CalendarToday,
  ExitToApp,
} from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import SidebarOptions from "./SidebarOptions";

const Sidebar = ({ user }) => {
  const id = useSelector((state) => state.id);

  return (
    <>
      <SidebarContainer>
        <SidebarOptions Icon={Home} text={"Home"} route={"companyScreen"} />
        <SidebarOptions Icon={Create} text={"Create"} route={"create"} />
        <SidebarOptions
          Icon={EventAvailable}
          text={"Booked"}
          route={"booked"}
        />
        <SidebarOptions Icon={CalendarToday} text={"View"} route={"calendar"} />
      </SidebarContainer>
    </>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  @media (max-width: 991px) {
    background-color: red;
    display: none;
  }
  display: flex;
  flex-direction: column;
  /* background-color: #333333; */

  background-color: #f7f7f7;

  height: 100vh;
  /* width: 200%; */

  font-weight: 200;

  color: #f7f7f7;
  > hr {
    border: 0.1px solid white;
    width: 100%;
  }
`;
const Top = styled.div`
  margin-left: 8%;

  /* padding-left: 10px; */
  margin-top: 15px;

  > i {
    font-size: 22px;
    margin-right: 10px;
  }
  > p {
    margin: 0;
    font-size: 22px;
    text-transform: capitalize;
  }
`;
