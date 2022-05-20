import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserBasicProfileDetails from "./components/UserBasicProfileDetails";
import UserSocialProfiles from "./components/UserSocialProfiles";
import UserPreferences from "./components/UserPreferences";

enum ProfileSections {
  GENERAL = "general",
  SOCIAL = "social",
  PREFERENCES = "preferences",
}

function UserProfile() {
  const [expanded, setExpanded] = React.useState<ProfileSections | false>(
    ProfileSections.GENERAL
  );
  const handleChange =
    (panel: ProfileSections) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
      }}
    >
      <Accordion
        expanded={expanded === ProfileSections.GENERAL}
        onChange={handleChange(ProfileSections.GENERAL)}
        elevation={0}
        sx={{
          "&.MuiPaper-root": {
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Basic profile info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserBasicProfileDetails />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === ProfileSections.SOCIAL}
        onChange={handleChange(ProfileSections.SOCIAL)}
        elevation={0}
        sx={{
          "&.MuiPaper-root": {
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Social Info
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Connect social profiles
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserSocialProfiles />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === ProfileSections.PREFERENCES}
        onChange={handleChange(ProfileSections.PREFERENCES)}
        elevation={0}
        sx={{
          "&.MuiPaper-root": {
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.32))",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Preferences
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            App settings/preferences
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UserPreferences />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default UserProfile;
