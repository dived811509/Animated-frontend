"use client";

import React from "react";
import Image from "next/image"; // ✅ FIX: proper Image import
import { X } from "lucide-react"; // ✅ FIX: X icon import
import { useRouter } from "next/navigation"; // ✅ FIX: proper hook import

import UploadCareButton from "./uploadcare-button";
import { Button } from "@/components/ui/button";

type Props = {
  userImage: string | null;
  onDelete?: () => Promise<boolean> | Promise<void>;
  onUpload?: any;
};

const ProfilePicture = ({ userImage, onDelete }: Props) => {
  const router = useRouter();

  const onRemoveProfileImage = async () => {
    if (!onDelete) return;

    const response = await onDelete();
    if (response !== false) {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>

      <div className="flex h-[30vh] flex-col items-center justify-center">
        {userImage ? (
          <>
            <div className="relative h-full w-2/12">
              <Image
                src={userImage}
                alt="User_Image"
                fill
                className="object-cover rounded-full"
              />
            </div>

            <Button
              onClick={onRemoveProfileImage}
              variant="ghost"
              className="text-white/70 hover:text-white"
            >
              <X className="mr-2 h-4 w-4" />
              Remove Logo
            </Button>
          </>
        ) : (
          <UploadCareButton />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
