"use client";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";

interface NewInvoiceFormProps {
  onSave?: (
    values: { name: string; amount: number; dueDate: string },
    status: "paid" | "pending" | "draft",
  ) => void;
}

const NewInvoiceForm = (_props: NewInvoiceFormProps) => {
  const [items, setItems] = useState([
    { name: "", quantity: 0, price: 0, total: 0 },
  ]);

  const handleAdditems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      { name: "", quantity: 0, price: 0, total: 0 },
    ]);
  };

  const handleRemoveList = () => {
    setItems((prevItems) => prevItems.slice(0, -1));
  };
  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <h6 className="text-[#7C5DFA] font-bold mb-5">Bill From</h6>

        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="streetaddress">
            Street Address
          </label>
          <input
            type="text"
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="flex gap-1 md:gap-3 flex-row flex-wrap">
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="city">
              City
            </label>
            <input
              type="text"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="postcode">
              Post Code
            </label>
            <input
              type="text"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-full flex-2 md:flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
        </span>

        <h6 className="text-[#7C5DFA] font-bold my-3">Bill To</h6>

        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="Clientname">
            Client’s Name
          </label>
          <input
            type="text"
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="Client’s Email">
            Client’s Email
          </label>
          <input
            type="text"
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="Street Address">
            Street Address
          </label>
          <input
            type="text"
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="flex gap-1 md:gap-3 flex-row flex-wrap">
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billtocity">
              City
            </label>
            <input
              type="text"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billtopostcode">
              Post Code
            </label>
            <input
              type="text"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-full flex-2 md:flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billtocountry">
              Country
            </label>
            <input
              type="text"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
        </span>
        <span className="flex flex-col md:flex-row gap-2">
          <span className=" flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="invoicedate">
              Invoice Date
            </label>
            <input
              type="date"
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className=" flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="paymentterms">
              Payment Terms
            </label>
            <select className="border-[#DFE3FA] border p-3.5 rounded-md font-bold text-[15px]">
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </span>
        </span>
        <span className=" flex flex-col gap-2">
          <label
            className="text-muted text-[13px]"
            htmlFor="projectdescription"
          >
            Project Description
          </label>
          <input
            type="text"
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>

        <h6 className="text-[#777F98] font-bold my-3">Item List</h6>

        {items.map((item, index) => (
          <span key={index} className="flex flex-col md:flex-row  gap-4">
            <span className="flex flex-1 flex-col gap-2">
              <label className="text-muted text-[13px]" htmlFor="itemname">
                Item Name
              </label>
              <input
                type="text"
                className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
              />
            </span>
            <span className="flex items-center justify-between gap-2 md:gap-4">
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className="text-muted text-[13px]"
                  htmlFor="itemquantity"
                >
                  Qty
                </label>
                <input
                  type="number"
                  className="border-[#DFE3FA] w-14 border p-3 rounded-md font-bold text-[15px]"
                />
              </span>
              <span className="flex flex-1 flex-col gap-2">
                <label className="text-muted text-[13px]" htmlFor="itemprice">
                  Price
                </label>
                <input
                  type="number"
                  className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
                />
              </span>
              <span className="flex flex-col gap-2">
                <label className="text-muted text-[13px]" htmlFor="itemtotal">
                  Total
                </label>
                <input
                  type="text"
                  className="border-[#DFE3FA] w-[100px]  p-3 rounded-md font-bold text-[15px] text-[#888EB0]"
                />
              </span>
              <span>
                <IoMdTrash
                  onClick={handleRemoveList}
                  size={24}
                  color="#888EB0"
                  className="mt-2 hover:hover:text-red-600"
                />
              </span>
            </span>
          </span>
        ))}

        <button
          onClick={handleAdditems}
          className="bg-[#F9FAFE] dark:bg-[#252945] dark:text-white py-3 rounded-full text-[#7E88C3] font-bold"
        >
          + Add New Item
        </button>
      </form>
    </div>
  );
};

export default NewInvoiceForm;
