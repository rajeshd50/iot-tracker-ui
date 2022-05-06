import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

export interface IPageHeaderProps {
  title: string;
  subTitle?: string;
  ActionComponent?: React.ReactNode | JSX.Element | React.ReactElement;
  showBorderBottom?: boolean;
}

function PageHeader(props: IPageHeaderProps) {
  const { title, subTitle, ActionComponent, showBorderBottom = false } = props;
  return (
    <Box
      sx={{
        width: "100%",
        ...(showBorderBottom && {
          borderBottom: `1px solid ${grey[400]}`,
          paddingBottom: "16px",
          marginBottom: "4px",
        }),
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">{title}</Typography>
            {subTitle ? (
              <Typography variant="subtitle2">{subTitle}</Typography>
            ) : null}
          </Box>
        </Grid>
        {ActionComponent ? (
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {ActionComponent}
          </Grid>
        ) : null}
      </Grid>
    </Box>
  );
}

export default PageHeader;
