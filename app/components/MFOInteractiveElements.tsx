// MFOInteractiveElements.tsx - Client Component
"use client";
import React, { useState } from "react";
import { InfoButton } from "@/app/ui/Buttons/InfoButton";
import MFODetailsPopup from "@/app/ui/Popups/MFODetailsPopup";
import { Mfo } from "@/app/services/mfos/mfoTypes";

interface MFOInteractiveElementsProps {
  offer: Mfo;
}

export default function MFOInteractiveElements({
  offer,
}: MFOInteractiveElementsProps) {
  const [selectedMFO, setSelectedMFO] = useState<Mfo | null>(null);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);

  return (
    <>
      <InfoButton
        onClick={() => {
          setSelectedMFO(offer);
          setIsDetailsPopupOpen(true);
        }}
      />

      {selectedMFO && (
        <MFODetailsPopup
          mfo={selectedMFO}
          isOpen={isDetailsPopupOpen}
          onClose={() => {
            setIsDetailsPopupOpen(false);
            setSelectedMFO(null);
          }}
        />
      )}
    </>
  );
}
