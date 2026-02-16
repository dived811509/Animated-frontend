"use client";

import React, { useEffect, useRef } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";

type Props = {
  onUpload?: (url: string) => Promise<void> | void;
};

LR.registerBlocks(LR);

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();

  const ctxProviderRef = useRef<
    (typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider) | null
  >(null);

  useEffect(() => {
    if (!ctxProviderRef.current) return;

    const handleUpload = (e: Event) => {
      const customEvent = e as CustomEvent<{ cdnUrl?: string }>;
      const url = customEvent?.detail?.cdnUrl;

      if (url) {
        onUpload?.(url);
        router.refresh();
      }
    };

    const el = ctxProviderRef.current as unknown as HTMLElement;

    el.addEventListener("file-upload-success", handleUpload as EventListener);

    return () => {
      el.removeEventListener(
        "file-upload-success",
        handleUpload as EventListener,
      );
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
