"use client";
import React, { useEffect, useRef } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";

type Props = {
  onUpload?: any;
};

LR.registerBlocks(LR);

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<
    (typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider) | null
  >(null);

  useEffect(() => {
    const handleUpload = async (e: CustomEvent) => {
      const file = await onUpload?.(e.detail.cdnUrl);
      if (file) router.refresh();
    };

    if (ctxProviderRef.current) {
      ctxProviderRef.current.addEventListener(
        "file-upload-success",
        handleUpload,
      );
    }

    return () => {
      if (ctxProviderRef.current) {
        ctxProviderRef.current.removeEventListener(
          "file-upload-success",
          handleUpload,
        );
      }
    };
  }, [onUpload, router]);

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="6e60f6543d0f7da3009b" />
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`${process.env.NEXT_PUBLIC_UPLOADCARE_CSS_SRC}${LR.PACKAGE_VERSION}${process.env.NEXT_PUBLIC_UPLOADCARE_SRC_PACKAGE}`}
      />
      <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader" />
    </div>
  );
};

export default UploadCareButton;
