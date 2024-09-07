"use client";

import { useQuery } from "@tanstack/react-query";

import {
  CardWithList,
  ChecklistsWithCheckListItems,
  ListAttachment,
  ListLabel,
} from "@/types";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";
import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { Activity } from "./activity";
import { Label } from "./label";
import { db } from "@/lib/db";
import { Checklist } from "./chacklist";
import { useEffect, useState } from "react";
import { Attachement } from "./attachment";
import { Member } from "./member";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const [labels, setLabels] = useState<ListLabel[] | undefined>([]);
  const [checklist, setChecklist] = useState<
    ChecklistsWithCheckListItems[] | undefined
  >([]);
  const [attachment, setAttachment] = useState<ListAttachment[]>([]);

  const { data: labelData } = useQuery<ListLabel[]>({
    queryKey: ["label", id],
    queryFn: () => fetcher(`/api/cards/${id}/label`),
  });
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  const { data: chacklistData } = useQuery<ChecklistsWithCheckListItems[]>({
    queryKey: ["checklist", id],
    queryFn: () => fetcher(`/api/cards/${id}/checklist`),
  });

  const { data: attachmentData } = useQuery<ListAttachment[]>({
    queryKey: ["attachment", id],
    queryFn: () => fetcher(`/api/cards/${id}/attachment`),
  });

  useEffect(() => {
    if (attachmentData) {
      setAttachment(attachmentData);
    }
  }, [attachmentData]);

  useEffect(() => {
    setLabels(labelData);
  }, [labelData]);

  useEffect(() => {
    setChecklist(chacklistData);
  }, [chacklistData]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4 p-7">
          <div className="col-span-3">
            {!labels ? <Label.Skeleton /> : <Label data={labels} />}

            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!checklist ? (
                <Checklist.Skeleton />
              ) : (
                <Checklist data={checklist} id={id} />
              )}
              {!checklist ? (
                <Attachement.Skeleton />
              ) : (
                <Attachement data={attachment} />
              )}

              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <Actions.Skeleton />
          ) : (
            <Actions
              data={cardData}
              setChecklist={setChecklist}
              checklist={checklist}
              setLabels={setLabels}
              labels={labels}
              setAttachment={setAttachment}
              attachment={attachment}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
