import { Box, CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import { useImage } from "react-image";
import AppImageError from "./AppImageError";

import styles from "./AppImage.module.scss";

export interface IAppImageProps {
  src: string;
  alt: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

function AppImageInner({ src, alt, imgProps }: IAppImageProps) {
  const { src: imgSrc } = useImage({
    srcList: src,
  });

  return <img {...imgProps} src={imgSrc} alt={alt} />;
}

function AppImageFallback() {
  return (
    <Box className={styles.AppImageLoaderContainer}>
      <CircularProgress size="1rem" />
    </Box>
  );
}

function AppImage(props: IAppImageProps) {
  return (
    <AppImageError>
      <Suspense fallback={<AppImageFallback />}>
        <AppImageInner {...props} />
      </Suspense>
    </AppImageError>
  );
}

export default AppImage;
