"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import EditInvoiceForm from "../editInvoiceForm";

const FooterBtn = ({ className }: { className?: string }) => {
  const router = useRouter();
  const param = useParams();
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex justify-evenly bg-card p-4 font-bold text-white ${className}`}
    >
      <Drawer direction={"left"}>
        <DrawerTrigger asChild>
          <button className="px-4 text-[15px] md:px-6 bg-button-secondary hover:opacity-85 text-button-secondary-foreground md:py-4 rounded-full cursor-pointer transition-opacity">
            Edit
          </button>
        </DrawerTrigger>
        <DrawerContent className="data-[vaul-drawer-direction=left]:w-screen">
          <DrawerHeader>
            <DrawerClose asChild>
              <button className="flex gap-2 items-center my-3 cursor-pointer">
                <IoIosArrowBack className="text-button-primary" size={16} />
                <span className="mt-1 font-bold">Go Back</span>
              </button>
            </DrawerClose>
          </DrawerHeader>
          <div className="no-scrollbar overflow-auto px-4 md:p-8 pb-20 md:pb-0">
            <h3 className="font-bold text-2xl mb-4">
              Edit <span className="text-muted"> #</span>XM9141
            </h3>

            <EditInvoiceForm />
          </div>
          <DrawerFooter className="">
            <span className="flex justify-end gap-2 font-bold">
              <DrawerClose asChild>
                <button className="bg-button-secondary text-muted py-3 px-4 rounded-full">
                  Cancel
                </button>
              </DrawerClose>
              <button className="bg-button-primary text-white py-3 px-4 rounded-full">
                Save Changes
              </button>
            </span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-4 text-[15px] bg-[#EC5757] hover:bg-[#E53E3E] md:py-4 rounded-full cursor-pointer">
            Delete
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-muted">
              {`
             Are you sure you want to delete invoice ${param.id}  This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <span className="flex justify-end gap-3 font-bold">
              <DialogClose asChild>
                <button className="bg-button-secondary text-button-secondary-foreground py-3 px-4 rounded-full">
                  Cancel
                </button>
              </DialogClose>
              <button className="bg-[#EC5757] text-[#F9FAFE] py-3 px-4 rounded-full">
                Delete
              </button>
            </span>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <button
        onClick={() => {}}
        className="px-4 py-2 text-[15px] bg-[#7C5DFA] hover:bg-[#6B46C1] md:py-4 rounded-full cursor-pointer"
      >
        Mark as Paid
      </button>
    </div>
  );
};

export default FooterBtn;
