import { Attachment, Card, Checklist, ChecklistItem, Label, List } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };


export type ListLabel = Label & { list: Card[] };
export type ChecklistsWithCheckListItems = Checklist & { items: ChecklistItem[] };


export type ListAttachment= Attachment & { list: Card[] };


export type CardWithALL= Card & { attachments: Attachment[], checklists: ChecklistsWithCheckListItems[], labels: Label[] };

export type ListWithAll = List & { cards: CardWithALL[] };