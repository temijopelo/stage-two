"use client";

import EditInvoiceForm from "../editInvoiceForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "../ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {
  deleteFullInvoice,
  deleteInvoice,
  saveEditedInvoice,
  updateInvoiceStatus,
} from "@/lib/invoice-storage";
import { Invoice, InvoiceFormValues } from "@/types";
import { useRouter } from "next/navigation";

type InvoiceActionData = Invoice & {
  billFrom?: {
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo?: {
    name: string;
    email: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
  };
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  invoiceDate?: string;
  paymentTerms?: string;
  projectDescription?: string;
};

interface FooterBtnProps {
  className?: string;
  invoice: InvoiceActionData;
  onInvoiceUpdated?: (invoice: InvoiceActionData) => void;
  onInvoiceDeleted?: () => void;
}

const FooterBtn = ({
  className,
  invoice,
  onInvoiceUpdated,
  onInvoiceDeleted,
}: FooterBtnProps) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const canMarkAsPaid = invoice.status === "pending";

  const handleSaveChanges = (values: InvoiceFormValues) => {
    const updatedInvoice = saveEditedInvoice(invoice.id, values);
    if (updatedInvoice) {
      onInvoiceUpdated?.(updatedInvoice);
    }
    setEditOpen(false);
  };

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    deleteFullInvoice(invoice.id);
    setDeleteOpen(false);
    onInvoiceDeleted?.();
    router.push("/invoices");
  };

  const handleMarkAsPaid = () => {
    if (!canMarkAsPaid) return;

    const updatedInvoice = updateInvoiceStatus(invoice.id, "paid");
    if (updatedInvoice) {
      onInvoiceUpdated?.({ ...invoice, status: "paid" });
    }
  };

  return (
    <div
      className={`flex justify-between gap-3 bg-card p-3 font-bold text-white md:flex-row md:items-center md:justify-end ${className ?? ""}`}
    >
      <Drawer open={editOpen} onOpenChange={setEditOpen} direction="left">
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="px-4 text-[15px] md:px-6 bg-button-secondary hover:bg-[#DFE3FA] hover:text-[#7E88C3] text-button-secondary-foreground md:py-4 rounded-full cursor-pointer transition-opacity"
        >
          Edit
        </button>
        <DrawerContent className="data-[vaul-drawer-direction=left]:w-screen">
          <DrawerHeader>
            <DrawerClose asChild>
              <button className="flex gap-2 items-center my-3 cursor-pointer text-foreground">
                <IoIosArrowBack className="text-button-primary" size={16} />
                <span className="mt-1 font-bold">Go Back</span>
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="no-scrollbar overflow-auto px-4 md:p-8 pb-20 md:pb-0">
            <h3 className="font-bold text-2xl mb-4">
              Edit <span className="text-muted"> #</span>
              {invoice.id}
            </h3>

            <EditInvoiceForm
              invoice={invoice}
              formId={`edit-invoice-form-${invoice.id}`}
              onSave={handleSaveChanges}
            />
          </div>
          <DrawerFooter>
            <span className="flex justify-end gap-2 font-bold">
              <DrawerClose asChild>
                <button className="bg-button-secondary text-muted py-3 px-4 rounded-full">
                  Cancel
                </button>
              </DrawerClose>
              <button
                type="submit"
                form={`edit-invoice-form-${invoice.id}`}
                className="bg-button-primary text-white py-3 px-4 rounded-full"
              >
                Save Changes
              </button>
            </span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="px-4 text-[15px] bg-[#EC5757] hover:bg-[#FF9797] hover:text-[#FFFFFF] md:py-4 rounded-full cursor-pointer"
        >
          Delete
        </button>
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-muted">
              {`Are you sure you want to delete invoice ${invoice.id}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <span className="flex justify-end gap-3 font-bold">
              <DialogClose asChild>
                <button className="bg-button-secondary text-button-secondary-foreground py-3 px-4 rounded-full">
                  Cancel
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-[#EC5757] text-[#F9FAFE] py-3 px-4 rounded-full"
              >
                Delete
              </button>
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <button
        type="button"
        onClick={handleMarkAsPaid}
        disabled={!canMarkAsPaid}
        className={`px-4 py-2 text-[15px] md:py-4 rounded-full cursor-pointer ${
          canMarkAsPaid
            ? "bg-[#7C5DFA] hover:bg-[#9277FF] text-white"
            : "bg-[#7C5DFA]/40 text-white/70 cursor-not-allowed"
        }`}
      >
        Mark as Paid
      </button>
    </div>
  );
};

export default FooterBtn;
