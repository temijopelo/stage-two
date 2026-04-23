"use client";

import EmptyState from "@/components/empty-state";
import InvoiceCard from "@/components/invoice-card";
import NewInvoiceForm from "@/components/newInvoiceForm";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { createInvoice, getInvoices } from "@/lib/invoice-storage";
import { Invoice, InvoiceFormValues, InvoiceStatus } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FILTERS_KEY = "invoice-filters";

const InvoicePage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 425px)");

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [open, setOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [paidInvoices, setPaidInvoices] = useState(false);
  const [draftInvoices, setDraftInvoices] = useState(false);
  const [pendingInvoices, setPendingInvoices] = useState(false);

  useEffect(() => {
    setInvoices(getInvoices());

    const storedFilters = localStorage.getItem(FILTERS_KEY);
    if (!storedFilters) return;

    try {
      const parsed = JSON.parse(storedFilters) as {
        paid: boolean;
        draft: boolean;
        pending: boolean;
      };

      setPaidInvoices(Boolean(parsed.paid));
      setDraftInvoices(Boolean(parsed.draft));
      setPendingInvoices(Boolean(parsed.pending));
    } catch {
      localStorage.removeItem(FILTERS_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      FILTERS_KEY,
      JSON.stringify({
        paid: paidInvoices,
        draft: draftInvoices,
        pending: pendingInvoices,
      }),
    );
  }, [paidInvoices, draftInvoices, pendingInvoices]);

  const filteredInvoices = useMemo(() => {
    const selectedStatuses: InvoiceStatus[] = [];

    if (draftInvoices) selectedStatuses.push("draft");
    if (pendingInvoices) selectedStatuses.push("pending");
    if (paidInvoices) selectedStatuses.push("paid");

    if (selectedStatuses.length === 0) return invoices;

    return invoices.filter((invoice) =>
      selectedStatuses.includes(invoice.status),
    );
  }, [draftInvoices, pendingInvoices, paidInvoices, invoices]);

  const handleCreate = (values: InvoiceFormValues, status: InvoiceStatus) => {
    createInvoice(values, status);
    setInvoices(getInvoices());
    setIsCreateOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          <h2 className="font-bold text-[24px]">Invoices</h2>
          {isMobile ? (
            <p className="text-muted text-[13px]">
              {filteredInvoices.length} Invoices
            </p>
          ) : (
            <p className="text-muted text-[13px]">
              There are {filteredInvoices.length} total invoices
            </p>
          )}
        </span>

        <span className="flex justify-between items-center gap-4">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                {isMobile ? (
                  <h5 className="font-bold text-[15px]">Filter</h5>
                ) : (
                  <h5 className="font-bold text-[15px]">Filter by Status</h5>
                )}
                {open ? (
                  <IoIosArrowUp className="text-button-primary" size={16} />
                ) : (
                  <IoIosArrowDown className="text-button-primary" size={16} />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="draft-invoices"
                      name="draft-invoices"
                      checked={draftInvoices}
                      onCheckedChange={(checked) => setDraftInvoices(!!checked)}
                      className=" data-[state=checked]:bg-button-primary data-[state=checked]:text-white data-[state=checked]:border-button-primary dark:data-[state=checked]:bg-button-primary dark:data-[state=checked]:border-button-primary"
                    />
                    <label htmlFor="draft-invoices">Draft</label>
                  </div>
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="pending-invoices"
                      name="pending-invoices"
                      checked={pendingInvoices}
                      onCheckedChange={(checked) =>
                        setPendingInvoices(!!checked)
                      }
                      className=" data-[state=checked]:bg-button-primary data-[state=checked]:text-white data-[state=checked]:border-button-primary dark:data-[state=checked]:bg-button-primary dark:data-[state=checked]:border-button-primary"
                    />
                    <label htmlFor="pending-invoices">Pending</label>
                  </div>
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="paid-invoices"
                      name="paid-invoices"
                      checked={paidInvoices}
                      onCheckedChange={(checked) => setPaidInvoices(!!checked)}
                      className=" data-[state=checked]:bg-button-primary data-[state=checked]:text-white data-[state=checked]:border-button-primary dark:data-[state=checked]:bg-button-primary dark:data-[state=checked]:border-button-primary"
                    />
                    <label htmlFor="paid-invoices">Paid</label>
                  </div>
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Drawer
            direction={"left"}
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
          >
            <DrawerTrigger asChild>
              <button className="bg-button-primary flex items-center space-x-2 p-1.5 pr-2.5 rounded-full text-white cursor-pointer hover:bg-button-primary/80 transition">
                <BiPlus
                  size={24}
                  className="text-button-primary bg-white rounded-full"
                />
                {isMobile ? (
                  <span className="text-[13px] mt-1">New</span>
                ) : (
                  <span className="text-[13px] mt-1">New Invoice</span>
                )}
              </button>
            </DrawerTrigger>

            <DrawerContent className="data-[vaul-drawer-direction=left]:w-screen flex md:data-[vaul-drawer-direction=left]:w-[900px]">
              <DrawerHeader>
                <DrawerClose asChild>
                  <button className="flex gap-2 items-center my-3 cursor-pointer hover:opacity-80 transition-opacity">
                    <IoIosArrowBack className="text-button-primary" size={16} />
                    <span className="mt-1 font-bold">Go Back</span>
                  </button>
                </DrawerClose>
              </DrawerHeader>

              <div className="no-scrollbar overflow-auto px-4 pb-20">
                <h3 className="font-bold text-2xl mb-4">New Invoice</h3>
                <NewInvoiceForm onSave={handleCreate} />
              </div>
              <DrawerFooter className="">
                <span className="flex justify-end md:justify-between gap-2 font-bold">
                  <DrawerClose className="" asChild>
                    <button className="bg-[#F9FAFE] dark:bg-white text-muted dark:text-[#7E88C3] py-2 px-4 rounded-full">
                      Discard
                    </button>
                  </DrawerClose>
                  <span className="flex gap-2">
                    <button className="bg-navbar-primary text-muted py-1.5 px-2.5 rounded-full">
                      Save as Draft
                    </button>
                    <button className="bg-button-primary text-white py-1.5 px-2.5 rounded-full">
                      Save & Send
                    </button>
                  </span>
                </span>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </span>
      </div>

      {filteredInvoices.length === 0 ? (
        <EmptyState
          text="There is nothing here"
          description="Create an invoice by clicking the New button and get started"
        />
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {filteredInvoices.map((invoice) => (
            <div key={invoice.id}>
              <InvoiceCard
                id={invoice.id}
                amount={invoice.amount}
                name={invoice.name}
                dueDate={invoice.dueDate}
                status={invoice.status}
                routerId={() => router.push(`/invoices/view?id=${invoice.id}`)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
