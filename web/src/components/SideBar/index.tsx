import React from "react";
import { SideBarProps } from "./type";
import VStack from "../VStack";
import { Link } from "react-router-dom";
import Center from "../Center";


const SideBar = ({ routes }: SideBarProps): React.ReactElement => {
  return (
    <VStack space={50} pl={10} pr={10} w="200px">

      <VStack space={30}>
        {routes.map((route, index) => {
          return (
            <Link style={{ textDecoration: "none" }} to={route.path} key={index}>
              {route.title}
            </Link>
          );
        })}
      </VStack>
    </VStack>
  );
}

export default SideBar;
