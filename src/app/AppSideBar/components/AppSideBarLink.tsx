import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect } from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { MENU_TYPES } from "../AppSideBar";

export interface IAppSideBarLinkProps {
  to: string;
  IconComponent: React.ElementType;
  text: string;
  isNested?: boolean;
  isParentActive?: boolean;
  menuType?: MENU_TYPES;
  setActive?: (type: MENU_TYPES) => void;
}

function AppSideBarLink({
  to,
  IconComponent,
  text,
  isNested = false,
  isParentActive,
  setActive,
  menuType,
}: IAppSideBarLinkProps) {
  const navigate = useNavigate();
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  useEffect(() => {
    if (menuType && match && !isParentActive) {
      if (setActive) {
        setActive(menuType);
      }
    }
  }, [match, isParentActive, menuType, setActive]);

  return (
    <ListItemButton
      sx={{
        ...(isNested && {
          pl: 4,
        }),
      }}
      onClick={() => navigate(to)}
      selected={!!match}
    >
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
}

export default AppSideBarLink;
