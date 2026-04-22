"use client";
import EditInvoiceForm from "@/components/editInvoiceForm";
import EmptyState from "@/components/empty-state";
import InvoiceCard from "@/components/invoice-card";
import NewInvoiceForm from "@/components/newInvoiceForm";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Invoice } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const InvoicePage = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "XM9141",
      name: "Graphic Design",
      amount: 556.0,
      dueDate: "19 Aug 2021",
      status: "paid",
    },
    {
      id: "RG0314",
      name: "Website Redesign",
      amount: 14002.33,
      dueDate: "20 Sep 2021",
      status: "pending",
    },
  ]);

  const fetchInvoices = async () => {
    //using localstorage for now, will replace with api call later
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="p-5 max-h-screen">
      <div className="flex justify-between items-center">
        <span>
          <h2 className="font-bold text-[24px]">Invoices</h2>
          <p className="text-muted text-[13px]">{invoices.length} Invoices</p>
        </span>
        <span className="flex justify-between items-center gap-4">
          <span className="flex items-center space-x-3">
            <h5 className="font-bold text-[15px]">Filter</h5>
            <IoIosArrowDown className="text-button-primary" />
          </span>

          <Drawer direction={"left"}>
            <DrawerTrigger asChild>
              <button className="bg-button-primary flex items-center space-x-2 p-1.5 pr-2.5 rounded-full text-white cursor-pointer hover:bg-button-primary/80 transition">
                <BiPlus
                  size={24}
                  className="text-button-primary bg-white rounded-full"
                />
                <span className="text-[13px] mt-1">New</span>
              </button>
            </DrawerTrigger>
            <DrawerContent className="data-[vaul-drawer-direction=left]:w-screen flex md:data-[vaul-drawer-direction=left]:w-[900px]">
              <DrawerHeader>
                <DrawerClose asChild>
                  <button className="flex gap-2 items-center my-3 cursor-pointer">
                    <IoIosArrowBack className="text-button-primary" size={16} />
                    <span className="mt-1 font-bold">Go Back</span>
                  </button>
                </DrawerClose>
              </DrawerHeader>
              <div className="no-scrollbar overflow-auto px-4 pb-20">
                <h3 className="font-bold text-2xl mb-4">New Invoice</h3>

                <NewInvoiceForm />
              </div>
              <DrawerFooter className="">
                <span className="flex justify-end gap-2 font-bold">
                  <DrawerClose asChild>
                    <button className="bg-button-secondary text-button-secondary-foreground py-1.5 px-2.5 rounded-full">
                      Discard
                    </button>
                  </DrawerClose>
                  <button className="bg-navbar-primary text-muted py-1.5 px-2.5 rounded-full">
                    Save as Draft
                  </button>
                  <button className="bg-button-primary text-button-primary-foreground py-1.5 px-2.5 rounded-full">
                    Save & Send
                  </button>
                </span>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </span>
      </div>

      {invoices.length === 0 ? (
        <EmptyState
          text="There is nothing here"
          description="Create an invoice by clicking the 
New button and get started"
        />
      ) : (
        <div className="flex flex-col gap-4 mt-6">
          {invoices.map((invoice, index) => (
            <div key={index}>
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
