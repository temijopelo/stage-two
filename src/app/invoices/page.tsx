"use client";
import EmptyState from "@/components/empty-state";
import InvoiceCard from "@/components/invoice-card";
import { Invoice } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const InvoicePage = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

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
    <div className="p-4 max-h-screen">
      <div className="flex justify-between items-center">
        <span>
          <h2 className="font-bold text-[24px]">Invoices</h2>
          <p className="text-[#888EB0] text-[13px]">
            {invoices.length} Invoices
          </p>
        </span>
        <span className="flex justify-between items-center gap-4">
          <span className="flex items-center space-x-3">
            <h5 className="font-bold text-[15px]">Filter</h5>
            <IoIosArrowDown className="text-button-primary" />
          </span>
          <button
            onClick={() => router.push("/app/invoices/create")}
            className="bg-button-primary flex items-center space-x-2 p-1.5 pr-2.5 rounded-full text-white cursor-pointer hover:bg-button-primary/80 transition"
          >
            <BiPlus
              size={24}
              className="text-button-primary bg-white rounded-full"
            />
            <span className="text-[13px] mt-1">New</span>
          </button>
        </span>
      </div>

      {invoices.length === 0 ? (
        <EmptyState
          text="There is nothing here"
          description="Create an invoice by clicking the 
New button and get started"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {invoices.map((invoice) => (
            <InvoiceCard
              id={invoice.id}
              amount={invoice.amount}
              name={invoice.name}
              dueDate={invoice.dueDate}
              status={invoice.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoicePage;
