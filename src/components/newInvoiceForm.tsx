"use client";
import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { InvoiceFormValues } from "@/types";
import { validateInvoiceForm } from "@/lib/invoice-validation";

interface NewInvoiceFormProps {
  onSave?: (values: InvoiceFormValues) => void;
  onDraft?: (values: InvoiceFormValues) => void;
  formId?: string;
}

const NewInvoiceForm = ({ onSave, onDraft, formId }: NewInvoiceFormProps) => {
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
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showFieldErrors, setShowFieldErrors] = useState(false);

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
    if (!onSave && !onDraft) return;

    const intent =
      event?.nativeEvent instanceof SubmitEvent
        ? (event.nativeEvent.submitter as HTMLButtonElement | null)?.value
        : null;

    const formValues: InvoiceFormValues = {
      billFrom,
      billTo,
      items: items.map(({ name, quantity, price }) => ({
        name,
        quantity,
        price,
      })),
      invoiceDate,
      paymentTerms,
      projectDescription,
    };

    if (intent === "draft") {
      setFormErrors([]);
      setShowFieldErrors(false);
      onDraft?.(formValues);
      return;
    }

    const validation = validateInvoiceForm(formValues, "final");

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setShowFieldErrors(true);
      return;
    }

    setFormErrors([]);
    setShowFieldErrors(false);

    onSave?.(formValues);
  };

  const labelClass = (hasError: boolean) =>
    `text-muted text-[13px] ${hasError ? "text-red-500" : ""}`;

  const inputClass = (hasError: boolean) =>
    `border p-3 rounded-md font-bold text-[15px] ${
      hasError
        ? "border-red-500 ring-1 ring-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        : "border-[#DFE3FA]"
    }`;

  const itemHasPartialValue = (item: {
    name: string;
    quantity: number;
    price: number;
  }) => item.name.trim() !== "" || item.quantity > 0 || item.price > 0;

  const itemIsComplete = (item: {
    name: string;
    quantity: number;
    price: number;
  }) => item.name.trim() !== "" && item.quantity > 0 && item.price > 0;

  const hasAnyCompleteItem = items.some(itemIsComplete);

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
          <label
            className={labelClass(
              showFieldErrors && !billFrom.streetAddress.trim(),
            )}
            htmlFor="billFromStreet"
          >
            Street Address
          </label>
          <input
            id="billFromStreet"
            type="text"
            value={billFrom.streetAddress}
            onChange={(e) =>
              handleUpdateBillFrom("streetAddress", e.target.value)
            }
            className={inputClass(
              showFieldErrors && !billFrom.streetAddress.trim(),
            )}
          />
        </span>
        <span className="flex gap-1 md:gap-3 flex-row flex-wrap">
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !billFrom.city.trim())}
              htmlFor="billFromCity"
            >
              City
            </label>
            <input
              id="billFromCity"
              type="text"
              value={billFrom.city}
              onChange={(e) => handleUpdateBillFrom("city", e.target.value)}
              className={inputClass(showFieldErrors && !billFrom.city.trim())}
            />
          </span>
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label
              className={labelClass(
                showFieldErrors && !billFrom.postCode.trim(),
              )}
              htmlFor="billFromPostCode"
            >
              Post Code
            </label>
            <input
              id="billFromPostCode"
              type="text"
              value={billFrom.postCode}
              onChange={(e) => handleUpdateBillFrom("postCode", e.target.value)}
              className={inputClass(
                showFieldErrors && !billFrom.postCode.trim(),
              )}
            />
          </span>
          <span className="w-full flex-2 md:flex-1 flex flex-col gap-2">
            <label
              className={labelClass(
                showFieldErrors && !billFrom.country.trim(),
              )}
              htmlFor="billFromCountry"
            >
              Country
            </label>
            <input
              id="billFromCountry"
              type="text"
              value={billFrom.country}
              onChange={(e) => handleUpdateBillFrom("country", e.target.value)}
              className={inputClass(
                showFieldErrors && !billFrom.country.trim(),
              )}
            />
          </span>
        </span>

        <h6 className="text-[#7C5DFA] font-bold my-3">Bill To</h6>

        <span className="w-full flex flex-col gap-2">
          <label
            className={labelClass(showFieldErrors && !billTo.name.trim())}
            htmlFor="billToName"
          >
            Client's Name
          </label>
          <input
            id="billToName"
            type="text"
            value={billTo.name}
            onChange={(e) => handleUpdateBillTo("name", e.target.value)}
            className={inputClass(showFieldErrors && !billTo.name.trim())}
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label
            className={labelClass(showFieldErrors && !billTo.email.trim())}
            htmlFor="billToEmail"
          >
            Client's Email
          </label>
          <input
            id="billToEmail"
            type="email"
            value={billTo.email}
            onChange={(e) => handleUpdateBillTo("email", e.target.value)}
            className={inputClass(showFieldErrors && !billTo.email.trim())}
          />
        </span>
        <span className="w-full flex flex-col gap-2">
          <label
            className={labelClass(
              showFieldErrors && !billTo.streetAddress.trim(),
            )}
            htmlFor="billToStreet"
          >
            Street Address
          </label>
          <input
            id="billToStreet"
            type="text"
            value={billTo.streetAddress}
            onChange={(e) =>
              handleUpdateBillTo("streetAddress", e.target.value)
            }
            className={inputClass(
              showFieldErrors && !billTo.streetAddress.trim(),
            )}
          />
        </span>
        <span className="flex gap-1 md:gap-3 flex-row flex-wrap">
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !billTo.city.trim())}
              htmlFor="billToCity"
            >
              City
            </label>
            <input
              id="billToCity"
              type="text"
              value={billTo.city}
              onChange={(e) => handleUpdateBillTo("city", e.target.value)}
              className={inputClass(showFieldErrors && !billTo.city.trim())}
            />
          </span>
          <span className="w-35 flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !billTo.postCode.trim())}
              htmlFor="billToPostCode"
            >
              Post Code
            </label>
            <input
              id="billToPostCode"
              type="text"
              value={billTo.postCode}
              onChange={(e) => handleUpdateBillTo("postCode", e.target.value)}
              className={inputClass(showFieldErrors && !billTo.postCode.trim())}
            />
          </span>
          <span className="w-full flex-2 md:flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !billTo.country.trim())}
              htmlFor="billToCountry"
            >
              Country
            </label>
            <input
              id="billToCountry"
              type="text"
              value={billTo.country}
              onChange={(e) => handleUpdateBillTo("country", e.target.value)}
              className={inputClass(showFieldErrors && !billTo.country.trim())}
            />
          </span>
        </span>
        <span className="flex flex-col md:flex-row gap-2">
          <span className=" flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !invoiceDate.trim())}
              htmlFor="invoiceDateInput"
            >
              Invoice Date
            </label>
            <input
              id="invoiceDateInput"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className={inputClass(showFieldErrors && !invoiceDate.trim())}
            />
          </span>
          <span className=" flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !paymentTerms.trim())}
              htmlFor="paymentTermsSelect"
            >
              Payment Terms
            </label>
            <select
              id="paymentTermsSelect"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className={`border p-3.5 rounded-md font-bold text-[15px] ${
                showFieldErrors && !paymentTerms.trim()
                  ? "border-red-500 ring-1 ring-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  : "border-[#DFE3FA]"
              }`}
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
            className={labelClass(
              showFieldErrors && !projectDescription.trim(),
            )}
            htmlFor="projectDescriptionInput"
          >
            Project Description
          </label>
          <input
            id="projectDescriptionInput"
            type="text"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className={inputClass(
              showFieldErrors && !projectDescription.trim(),
            )}
          />
        </span>

        <h6 className="text-[#777F98] font-bold my-3">Item List</h6>

        {items.map((item, index) => (
          <span key={index} className="flex flex-col md:flex-row  gap-4">
            <span className="flex flex-1 flex-col gap-2">
              <label
                className={labelClass(showFieldErrors && !item.name.trim())}
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
                className={inputClass(
                  showFieldErrors &&
                    ((!hasAnyCompleteItem && index === 0) ||
                      (itemHasPartialValue(item) && !item.name.trim())),
                )}
              />
            </span>
            <span className="flex items-center justify-between gap-2 md:gap-4">
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className={labelClass(
                    showFieldErrors && !item.quantity.toString().trim(),
                  )}
                  htmlFor={`itemQuantity${index}`}
                >
                  Qty
                </label>
                <input
                  id={`itemQuantity${index}`}
                  type="number"
                  min={0}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                  className={`w-14 ${inputClass(
                    showFieldErrors &&
                      ((!hasAnyCompleteItem && index === 0) ||
                        (itemHasPartialValue(item) && item.quantity <= 0)),
                  )}`}
                />
              </span>
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className={labelClass(
                    showFieldErrors && !item.price.toString().trim(),
                  )}
                  htmlFor={`itemPrice${index}`}
                >
                  Price
                </label>
                <input
                  id={`itemPrice${index}`}
                  type="number"
                  min={0}
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", Number(e.target.value))
                  }
                  className={inputClass(
                    showFieldErrors &&
                      ((!hasAnyCompleteItem && index === 0) ||
                        (itemHasPartialValue(item) && item.price <= 0)),
                  )}
                />
              </span>
              <span className="flex flex-col gap-2">
                <label
                  className={labelClass(
                    showFieldErrors && !item.total.toString().trim(),
                  )}
                  htmlFor={`itemTotal${index}`}
                >
                  Total
                </label>
                <input
                  id={`itemTotal${index}`}
                  type="text"
                  disabled
                  value={item.total.toFixed(2)}
                  className="border-[#DFE3FA] w-25 p-3 rounded-md font-bold text-[15px] text-[#888EB0] bg-gray-100"
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

        {formErrors.length > 0 && (
          <div className="p-4 text-sm text-red-500">
            <ul className="list-none pl-5 space-y-1">
              <li>- All fields must be added</li>
              <li>- An item must be added</li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewInvoiceForm;
