import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import {
  getSiteConfigValueByType,
  globalDialogClose,
} from "../../../../common/util/util";
import { SiteConfig, SITE_CONFIG_TYPES } from "../../../../models";
import { UpdateSiteConfigDto } from "../../../../services";

export interface IAdminSiteConfigUpdateProps {
  siteConfig: SiteConfig;
  loading: boolean;
  show: boolean;
  onClose: () => void;
  onUpdate: (data: UpdateSiteConfigDto) => void;
}

function AdminSiteConfigUpdate(props: IAdminSiteConfigUpdateProps) {
  const { siteConfig, loading, show, onClose, onUpdate } = props;

  const [description, setDescription] = useState("");

  const [singleTextValue, setSingleTextValue] = useState<string>("");
  const [multipleTextValue, setMultipleTextValue] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState<Date | null>(null);
  const [dateTimeValue, setDateTimeValue] = useState<Date | null>(null);
  const [numberValue, setNumberValue] = useState<number | null>(null);
  const [booleanValue, setBooleanValue] = useState<boolean | null>(null);

  useEffect(() => {
    if (siteConfig) {
      const updatedValue = getSiteConfigValueByType(
        siteConfig.value,
        siteConfig.type
      );
      switch (siteConfig.type) {
        case SITE_CONFIG_TYPES.BOOLEAN:
          setBooleanValue(updatedValue);
          break;
        case SITE_CONFIG_TYPES.TEXT:
          if (siteConfig.isMultipleEntry) {
            setMultipleTextValue(
              updatedValue
                ? updatedValue.split(",").map((x: string) => x.trim())
                : []
            );
          } else {
            setSingleTextValue(updatedValue);
          }
          break;
        case SITE_CONFIG_TYPES.NUMBER:
          setNumberValue(updatedValue);
          break;
        case SITE_CONFIG_TYPES.DATE:
          setDateValue(updatedValue);
          break;
        case SITE_CONFIG_TYPES.DATE_TIME:
          setDateTimeValue(updatedValue);
          break;
        default:
          setSingleTextValue(updatedValue || "");
      }
    }
  }, [siteConfig]);

  const onClickUpdate = () => {};
  return (
    <Dialog
      onClose={globalDialogClose(onClose)}
      open={show}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle
        sx={{ fontSize: "1.4rem", borderBottom: `1px solid ${grey[200]}` }}
      >
        Update config ({siteConfig.key})
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          autoFocus
          onClick={onClose}
          type="button"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          type="button"
          onClick={onClickUpdate}
        >
          {loading && (
            <CircularProgress
              size="1rem"
              color="primary"
              sx={{
                marginRight: "8px",
              }}
            />
          )}
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminSiteConfigUpdate;
