import { Box, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import UserBadge from "../../../../common/components/user/user-badge/UserBadge";
import { User } from "../../../../models";
import { useAppSelector } from "../../../../store/hooks";
import { selectUserDetails } from "../../../../store/reducers/userSlice";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import { grey } from "@mui/material/colors";
import { truncateText } from "../../../../common/util/util";

interface IUserInfoDetailsRowProps {
  IconElement: React.ElementType;
  value: string;
  borderBottom?: boolean;
}

function UserInfoDetailsRow({
  IconElement,
  value,
  borderBottom,
}: IUserInfoDetailsRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconElement
        sx={{
          color: grey[700],
        }}
      />
      <Tooltip title={value}>
        <Typography
          variant="subtitle1"
          sx={{
            marginLeft: "4px",
            ...(borderBottom && {
              borderBottom: `1px solid ${grey[300]}`,
              marginBottom: "2px",
            }),
          }}
        >
          {truncateText(value, 100)}
        </Typography>
      </Tooltip>
    </Box>
  );
}

function UserBasicProfileInfo() {
  const userDetails: User = useAppSelector(selectUserDetails);
  const userPhone = [
    userDetails.primaryContactNumber,
    userDetails.secondaryContactNumber,
  ]
    .filter((x) => !!x)
    .join(" / ");
  const userAddress = [
    userDetails.addressLine1,
    userDetails.addressLine2,
    userDetails.city,
    userDetails.state,
    userDetails.zip,
    userDetails.country,
  ]
    .filter((x) => !!x)
    .join(", ");
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <UserBadge width="5rem" height="5rem" fontVariant="h4" />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">{userDetails.fullName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <UserInfoDetailsRow
            value={userDetails.email}
            IconElement={EmailIcon}
            borderBottom
          />

          <UserInfoDetailsRow
            value={userPhone || "N/A"}
            IconElement={PhoneIcon}
            borderBottom
          />
          <UserInfoDetailsRow
            value={userAddress || "N/A"}
            IconElement={HomeIcon}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserBasicProfileInfo;
