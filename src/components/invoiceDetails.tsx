"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { formatDisplayDate, type StoredInvoice } from "@/lib/invoice-storage";
import { Invoice } from "@/types";

type InvoiceDetailsData = Invoice & {
  billFrom?: StoredInvoice["billFrom"];
  billTo?: StoredInvoice["billTo"];
  items?: StoredInvoice["items"];
  invoiceDate?: string;
  paymentTerms?: string;
  projectDescription?: string;
};

interface InvoiceDetailsProps {
  invoice: InvoiceDetailsData | null;
}

const formatCurrency = (value: number) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  const isMobile = useMediaQuery("(max-width: 425px)");

  if (!invoice) {
    return (
      <aside className="bg-card p-6 mt-6 rounded-lg flex flex-col gap-4 text-muted shadow-sm">
        <p className="font-bold text-foreground">No invoice selected</p>
        <p>Pick an invoice from the list to view its details.</p>
      </aside>
    );
  }

  const items = invoice.items ?? [];
  const billFrom = invoice.billFrom;
  const billTo = invoice.billTo;
  const title = invoice.projectDescription ?? invoice.name ?? "Invoice";
  const invoiceDate = invoice.invoiceDate ?? invoice.dueDate ?? "";
  const dueDate = invoice.dueDate ?? invoice.invoiceDate ?? "";

  const formatAddress = (
    address: InvoiceDetailsData["billFrom"] | InvoiceDetailsData["billTo"],
  ) => {
    if (!address) return "Not provided";

    return (
      <>
        {address.streetAddress} <br />
        {address.city} <br />
        {address.postCode} <br />
        {address.country}
      </>
    );
  };

  const ItemTable = () => {
    if (items.length === 0) {
      return (
        <div className="p-4 text-muted">
          No line items are available for this invoice.
        </div>
      );
    }

    return (
      <table className="w-full">
        <thead className="text-left text-muted">
          <tr className="">
            <th className="p-4 font-light">Item Name</th>
            <th className="p-4 text-right font-light">QTY.</th>
            <th className="p-4 text-right font-light">Price</th>
            <th className="p-4 text-right font-light">Total</th>
          </tr>
        </thead>

        <tbody className="text-left text-foreground rounded-2xl">
          {items.map((item, index) => (
            <tr key={`${item.name}-${index}`}>
              <td className="p-4">
                <span className="font-bold">{item.name}</span>
              </td>
              <td className="p-4 text-right text-muted font-bold">
                {item.quantity}
              </td>
              <td className="p-4 text-right text-muted font-bold">
                £ {formatCurrency(item.price)}
              </td>
              <td className="p-4 text-right font-bold">
                £ {formatCurrency(item.quantity * item.price)}
              </td>
            </tr>
          ))}
          <tr className="bg-navbar-primary text-white rounded-b-2xl">
            <td className="p-4 text-[13px] rounded-bl-2xl">Amount Due</td>
            <td></td>
            <td></td>
            <td className="p-4 text-right font-bold rounded-br-2xl col-span-1 text-[24px]">
              £ {formatCurrency(invoice.amount)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <aside className="bg-card p-6 mt-6 rounded-lg flex flex-col gap-8 text-muted shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <h2>
            #<span className="text-foreground font-bold">{invoice.id}</span>
          </h2>
          <p>{title}</p>
        </div>
        <div>
          <p>{formatAddress(billFrom)}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-8 justify-between">
        <span className="flex-1 md:flex-1 flex flex-col justify-between">
          <span className="flex flex-col gap-2">
            <span>Invoice Date</span>
            <span className="text-foreground font-bold">
              {invoiceDate ? formatDisplayDate(invoiceDate) : "Not provided"}
            </span>
          </span>
          <span className="flex flex-col gap-2">
            <span>Payment Due</span>
            <span className="text-foreground font-bold">
              {dueDate ? formatDisplayDate(dueDate) : "Not provided"}
            </span>
          </span>
        </span>
        <span className="flex-1 md:flex-1 flex flex-col gap-2">
          <span>Bill To</span>
          <span className="text-foreground font-bold">
            {billTo?.name ?? "Not provided"}
          </span>
          <span>{billTo ? formatAddress(billTo) : "Not provided"}</span>
        </span>
        <span className="w-full md:flex-1 flex flex-col gap-2">
          <span>Sent To</span>
          <span className="text-foreground font-bold">
            {billTo?.email ?? "Not provided"}
          </span>
        </span>
      </div>

      <div className="bg-secondary rounded-lg">
        {!isMobile ? (
          <ItemTable />
        ) : (
          <div>
            {items.length === 0 ? (
              <div className="p-4 text-muted">
                No line items are available for this invoice.
              </div>
            ) : (
              items.map((item, index) => (
                <span
                  key={`${item.name}-${index}`}
                  className="flex justify-between items-center p-4"
                >
                  <span className="flex flex-col">
                    <span className="text-[15px] font-bold text-foreground">
                      {item.name}
                    </span>
                    <span>
                      {item.quantity} x £ {formatCurrency(item.price)}
                    </span>
                  </span>
                  <span className="text-[15px] font-bold text-foreground">
                    £ {formatCurrency(item.quantity * item.price)}
                  </span>
                </span>
              ))
            )}
            <span className="bg-navbar-primary rounded-b-lg text-white flex justify-between items-center p-4">
              <span className="flex flex-col">
                <span className="text-[13px]">Grand Total</span>
              </span>
              <span className="text-[24px] font-bold">
                £ {formatCurrency(invoice.amount)}
              </span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default InvoiceDetails;
