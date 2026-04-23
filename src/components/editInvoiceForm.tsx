"use client";

import { InvoiceFormValues } from "@/types";
import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { validateInvoiceForm } from "@/lib/invoice-validation";

type EditableInvoice = Partial<InvoiceFormValues> & {
  name?: string;
  amount?: number;
  dueDate?: string;
};

interface EditInvoiceFormProps {
  invoice: EditableInvoice | null;
  formId?: string;
  onSave?: (values: InvoiceFormValues) => void;
}

type EditableItem = {
  name: string;
  quantity: number;
  price: number;
};

const emptyItem = (): EditableItem => ({
  name: "",
  quantity: 0,
  price: 0,
});

const emptyBillFrom = () => ({
  streetAddress: "",
  city: "",
  postCode: "",
  country: "",
});

const emptyBillTo = () => ({
  name: "",
  email: "",
  streetAddress: "",
  city: "",
  postCode: "",
  country: "",
});

const EditInvoiceForm = ({ invoice, formId, onSave }: EditInvoiceFormProps) => {
  const [items, setItems] = useState<EditableItem[]>([emptyItem()]);
  const [billFrom, setBillFrom] = useState(emptyBillFrom());
  const [billTo, setBillTo] = useState(emptyBillTo());
  const [invoiceDate, setInvoiceDate] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("30");
  const [projectDescription, setProjectDescription] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [showFieldErrors, setShowFieldErrors] = useState(false);

  useEffect(() => {
    setBillFrom(invoice?.billFrom ?? emptyBillFrom());
    setBillTo(invoice?.billTo ?? emptyBillTo());
    setInvoiceDate(invoice?.invoiceDate ?? "");
    setPaymentTerms(invoice?.paymentTerms ?? "30");
    setProjectDescription(invoice?.projectDescription ?? invoice?.name ?? "");
    setItems(
      invoice?.items?.length
        ? invoice.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          }))
        : [emptyItem()],
    );
  }, [invoice]);

  const handleAddItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setItems((previousItems) => [...previousItems, emptyItem()]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((previousItems) => {
      if (previousItems.length === 1) return [emptyItem()];
      return previousItems.filter((_, itemIndex) => itemIndex !== index);
    });
  };

  const handleItemChange = (
    index: number,
    field: keyof EditableItem,
    value: string | number,
  ) => {
    setItems((previousItems) => {
      const nextItems = [...previousItems];
      nextItems[index] = { ...nextItems[index], [field]: value };
      return nextItems;
    });
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!onSave) return;

    const formValues: InvoiceFormValues = {
      billFrom,
      billTo,
      items: items.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      invoiceDate,
      paymentTerms,
      projectDescription,
    };

    const validation = validateInvoiceForm(formValues, "final");

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setShowFieldErrors(true);
      return;
    }

    setFormErrors([]);
    setShowFieldErrors(false);
    onSave(formValues);
  };

  const labelClass = (hasError: boolean) =>
    `text-muted text-[13px] ${hasError ? "text-red-500" : ""}`;

  const inputClass = (hasError: boolean) =>
    `border p-3 rounded-md font-bold text-[15px] ${
      hasError
        ? "border-red-500 ring-1 ring-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        : "border-[#DFE3FA]"
    }`;

  return (
    <div>
      <form id={formId} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h6 className="text-[#7C5DFA] font-bold my-5">Bill From</h6>

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
            onChange={(event) =>
              setBillFrom((previous) => ({
                ...previous,
                streetAddress: event.target.value,
              }))
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
              onChange={(event) =>
                setBillFrom((previous) => ({
                  ...previous,
                  city: event.target.value,
                }))
              }
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
              onChange={(event) =>
                setBillFrom((previous) => ({
                  ...previous,
                  postCode: event.target.value,
                }))
              }
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
              onChange={(event) =>
                setBillFrom((previous) => ({
                  ...previous,
                  country: event.target.value,
                }))
              }
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
            onChange={(event) =>
              setBillTo((previous) => ({
                ...previous,
                name: event.target.value,
              }))
            }
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
            onChange={(event) =>
              setBillTo((previous) => ({
                ...previous,
                email: event.target.value,
              }))
            }
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
            onChange={(event) =>
              setBillTo((previous) => ({
                ...previous,
                streetAddress: event.target.value,
              }))
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
              onChange={(event) =>
                setBillTo((previous) => ({
                  ...previous,
                  city: event.target.value,
                }))
              }
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
              onChange={(event) =>
                setBillTo((previous) => ({
                  ...previous,
                  postCode: event.target.value,
                }))
              }
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
              onChange={(event) =>
                setBillTo((previous) => ({
                  ...previous,
                  country: event.target.value,
                }))
              }
              className={inputClass(showFieldErrors && !billTo.country.trim())}
            />
          </span>
        </span>
        <span className="flex flex-col md:flex-row gap-2">
          <span className="flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !billTo.name.trim())}
              htmlFor="billToName"
            >
              Name
            </label>
            <input
              id="invoiceDate"
              type="date"
              value={invoiceDate}
              onChange={(event) => setInvoiceDate(event.target.value)}
              className={inputClass(showFieldErrors && !invoiceDate.trim())}
            />
          </span>
          <span className="flex-1 flex flex-col gap-2">
            <label
              className={labelClass(showFieldErrors && !paymentTerms.trim())}
              htmlFor="paymentTerms"
            >
              Payment Terms
            </label>
            <select
              id="paymentTerms"
              value={paymentTerms}
              onChange={(event) => setPaymentTerms(event.target.value)}
              className={inputClass(showFieldErrors && !paymentTerms.trim())}
            >
              <option value="1">Net 1 Day</option>
              <option value="7">Net 7 Days</option>
              <option value="14">Net 14 Days</option>
              <option value="30">Net 30 Days</option>
            </select>
          </span>
        </span>
        <span className="flex flex-col gap-2">
          <label
            className={labelClass(
              showFieldErrors && !projectDescription.trim(),
            )}
            htmlFor="projectDescription"
          >
            Project Description
          </label>
          <input
            id="projectDescription"
            type="text"
            value={projectDescription}
            onChange={(event) => setProjectDescription(event.target.value)}
            className={inputClass(
              showFieldErrors && !projectDescription.trim(),
            )}
          />
        </span>

        <h6 className="text-[#777F98] font-bold my-3">Item List</h6>

        {items.map((item, index) => (
          <span
            key={`${item.name}-${index}`}
            className="flex flex-col md:flex-row gap-4"
          >
            <span className="flex flex-1 flex-col gap-2">
              <label
                className={labelClass(showFieldErrors && !item.name.trim())}
                htmlFor={`itemName-${index}`}
              >
                Item Name
              </label>
              <input
                id={`itemName-${index}`}
                type="text"
                value={item.name}
                onChange={(event) =>
                  handleItemChange(index, "name", event.target.value)
                }
                className={inputClass(showFieldErrors && !item.name.trim())}
              />
            </span>
            <span className="flex items-center justify-between gap-2 md:gap-4">
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className={labelClass(
                    showFieldErrors && !item.quantity.toString().trim(),
                  )}
                  htmlFor={`itemQty-${index}`}
                >
                  Qty
                </label>
                <input
                  id={`itemQty-${index}`}
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) =>
                    handleItemChange(
                      index,
                      "quantity",
                      Number(event.target.value),
                    )
                  }
                  className={`w-[50px] ${inputClass(
                    showFieldErrors && !item.quantity.toString().trim(),
                  )}`}
                />
              </span>
              <span className="flex flex-1 flex-col gap-2">
                <label
                  className={labelClass(
                    showFieldErrors && !item.price.toString().trim(),
                  )}
                  htmlFor={`itemPrice-${index}`}
                >
                  Price
                </label>
                <input
                  id={`itemPrice-${index}`}
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(event) =>
                    handleItemChange(index, "price", Number(event.target.value))
                  }
                  className={`w-[100px] ${inputClass(
                    showFieldErrors && !item.price.toString().trim(),
                  )}`}
                />
              </span>
              <span className="flex flex-col gap-2">
                <label
                  className="text-muted text-[13px]"
                  htmlFor={`itemTotal-${index}`}
                >
                  Total
                </label>
                <input
                  id={`itemTotal-${index}`}
                  type="text"
                  readOnly
                  value={`£ ${(Number(item.quantity) * Number(item.price)).toFixed(2)}`}
                  className="border-[#DFE3FA] w-[100px] p-3 rounded-md font-bold text-[15px] text-[#888EB0]"
                />
              </span>
              <span>
                <IoMdTrash
                  onClick={() => handleRemoveItem(index)}
                  size={24}
                  color="#888EB0"
                  className="mt-2 cursor-pointer hover:text-red-600"
                />
              </span>
            </span>
          </span>
        ))}

        <button
          onClick={handleAddItem}
          className="bg-[#F9FAFE] py-3 rounded-full text-[#7E88C3] font-bold"
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

export default EditInvoiceForm;
