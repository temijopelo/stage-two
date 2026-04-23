"use client";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { InvoiceFormValues } from "@/types";

interface NewInvoiceFormProps {
  onSave?: (values: InvoiceFormValues) => void;
  formId?: string;
}

const NewInvoiceForm = ({ onSave, formId }: NewInvoiceFormProps) => {
  const [items, setItems] = useState([
    { name: "", quantity: 0, price: 0, total: 0 },
  ]);

  const [billFrom, setBillFrom] = useState({
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  });

  const [billTo, setBillTo] = useState({
    name: "",
    email: "",
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  });

  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("30");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAdditems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setItems((prevItems) => [
      ...prevItems,
      { name: "", quantity: 0, price: 0, total: 0 },
    ]);
  };

  const handleRemoveList = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof (typeof items)[0],
    value: string | number,
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], [field]: value };
      if (field === "quantity" || field === "price") {
        newItems[index].total =
          newItems[index].quantity * newItems[index].price;
      }
      return newItems;
    });
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!onSave) return;

    const formValues: InvoiceFormValues = {
      billFrom,
      billTo,
      items: items.filter((item) => item.name.trim()),
      invoiceDate,
      paymentTerms,
      projectDescription,
    };

    onSave(formValues);
  };

  const handleUpdateBillFrom = (
    field: keyof typeof billFrom,
    value: string,
  ) => {
    setBillFrom((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateBillTo = (field: keyof typeof billTo, value: string) => {
    setBillTo((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div>
      <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h6 className="text-[#7C5DFA] font-bold mb-5">Bill From</h6>

        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="billFromStreet">
            Street Address
          </label>
          <input
            id="billFromStreet"
            type="text"
            value={billFrom.streetAddress}
            onChange={(e) =>
              handleUpdateBillFrom("streetAddress", e.target.value)
            }
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="flex gap-1 md:gap-3 flex-row flex-wrap">
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billFromCity">
              City
            </label>
            <input
              id="billFromCity"
              type="text"
              value={billFrom.city}
              onChange={(e) => handleUpdateBillFrom("city", e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label
              className="text-muted text-[13px]"
              htmlFor="billFromPostCode"
            >
              Post Code
            </label>
            <input
              id="billFromPostCode"
              type="text"
              value={billFrom.postCode}
              onChange={(e) => handleUpdateBillFrom("postCode", e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-full flex-2 md:flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billFromCountry">
              Country
            </label>
            <input
              id="billFromCountry"
              type="text"
              value={billFrom.country}
              onChange={(e) => handleUpdateBillFrom("country", e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
        </span>

        <h6 className="text-[#7C5DFA] font-bold my-3">Bill To</h6>

        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="billToName">
            Client's Name
          </label>
          <input
            id="billToName"
            type="text"
            value={billTo.name}
            onChange={(e) => handleUpdateBillTo("name", e.target.value)}
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="billToEmail">
            Client's Email
          </label>
          <input
            id="billToEmail"
            type="email"
            value={billTo.email}
            onChange={(e) => handleUpdateBillTo("email", e.target.value)}
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label className="text-muted text-[13px]" htmlFor="billToStreet">
            Street Address
          </label>
          <input
            id="billToStreet"
            type="text"
            value={billTo.streetAddress}
            onChange={(e) =>
              handleUpdateBillTo("streetAddress", e.target.value)
            }
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>
        <span className="flex gap-1 md:gap-3 flex-row flex-wrap">
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billToCity">
              City
            </label>
            <input
              id="billToCity"
              type="text"
              value={billTo.city}
              onChange={(e) => handleUpdateBillTo("city", e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billToPostCode">
              Post Code
            </label>
            <input
              id="billToPostCode"
              type="text"
              value={billTo.postCode}
              onChange={(e) => handleUpdateBillTo("postCode", e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className="w-full flex-2 md:flex-1 flex flex-col gap-2">
            <label className="text-muted text-[13px]" htmlFor="billToCountry">
              Country
            </label>
            <input
              id="billToCountry"
              type="text"
              value={billTo.country}
              onChange={(e) => handleUpdateBillTo("country", e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
        </span>
        <span className="flex flex-col md:flex-row gap-2">
          <span className=" flex-1 flex flex-col gap-2">
            <label
              className="text-muted text-[13px]"
              htmlFor="invoiceDateInput"
            >
              Invoice Date
            </label>
            <input
              id="invoiceDateInput"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
            />
          </span>
          <span className=" flex-1 flex flex-col gap-2">
            <label
              className="text-muted text-[13px]"
              htmlFor="paymentTermsSelect"
            >
              Payment Terms
            </label>
            <select
              id="paymentTermsSelect"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="border-[#DFE3FA] border p-3.5 rounded-md font-bold text-[15px]"
            >
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
            htmlFor="projectDescriptionInput"
          >
            Project Description
          </label>
          <input
            id="projectDescriptionInput"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
          />
        </span>

        <h6 className="text-[#777F98] font-bold my-3">Item List</h6>

        {items.map((item, index) => (
          <span key={index} className="flex flex-col md:flex-row  gap-4">
            <span className="flex flex-1 flex-col gap-2">
              <label
                className="text-muted text-[13px]"
                htmlFor={`itemName${index}`}
              >
                Item Name
              </label>
              <input
                id={`itemName${index}`}
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
              />
            </span>
            <span className="flex items-center justify-between gap-2 md:gap-4">
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className="text-muted text-[13px]"
                  htmlFor={`itemQuantity${index}`}
                >
                  Qty
                </label>
                <input
                  id={`itemQuantity${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                  className="border-[#DFE3FA] w-14 border p-3 rounded-md font-bold text-[15px]"
                />
              </span>
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className="text-muted text-[13px]"
                  htmlFor={`itemPrice${index}`}
                >
                  Price
                </label>
                <input
                  id={`itemPrice${index}`}
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", Number(e.target.value))
                  }
                  className="border-[#DFE3FA] border p-3 rounded-md font-bold text-[15px]"
                />
              </span>
              <span className="flex flex-col gap-2">
                <label
                  className="text-muted text-[13px]"
                  htmlFor={`itemTotal${index}`}
                >
                  Total
                </label>
                <input
                  id={`itemTotal${index}`}
                  type="text"
                  disabled
                  value={item.total.toFixed(2)}
                  className="border-[#DFE3FA] w-[100px]  p-3 rounded-md font-bold text-[15px] text-[#888EB0] bg-gray-100"
                />
              </span>
              <span>
                <IoMdTrash
                  onClick={() => handleRemoveList(index)}
                  size={24}
                  color="#888EB0"
                  className="mt-2 hover:text-red-600 cursor-pointer"
                />
              </span>
            </span>
          </span>
        ))}

        <button
          onClick={handleAdditems}
          className="bg-[#F9FAFE] dark:bg-[#252945] dark:text-white py-3 rounded-full text-[#7E88C3] font-bold hover:opacity-90 transition"
        >
          + Add New Item
        </button>
      </form>
    </div>
  );
};

export default NewInvoiceForm;
