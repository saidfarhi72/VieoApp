"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "@/components/modals/pro-modal";
import { CardDataProvider } from "@/providers/cardModalContext";
import { LoadingModal } from "../modals/loding-modal";
import { useLoadingModal } from "@/hooks/use-loading-modal";
import CoverImageModal from "../modals/cover-image-modal";
import SettingsModal from "../modals/settings-modal";

export const ModalProviderTril = () => {
  const [isMounted, setIsMounted] = useState(false);
  const loadingModal = useLoadingModal();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>

      <CardModal />
      {loadingModal.isOpen && <LoadingModal />}
      <SettingsModal />
      <CoverImageModal />

      <ProModal />
    </>
  )
}