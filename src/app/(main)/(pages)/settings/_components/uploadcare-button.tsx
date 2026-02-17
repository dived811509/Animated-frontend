"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  onUpload?: (url: string) => Promise<void> | void;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();

  return (
    <div className="text-sm text-muted-foreground">
      Uploadcare removed. No uploader configured.
    </div>
  );
};

export default UploadCareButton;
