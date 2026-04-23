"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import {
  getFullInvoiceById,
  getInvoiceById,
  type StoredInvoice,
} from "@/lib/invoice-storage";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import FooterBtn from "./common/footerBtn";
import InvoiceDetails from "./invoiceDetails";

type InvoiceDetail = StoredInvoice | ReturnType<typeof getInvoiceById>;

const ViewInvoiceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const isMobile = useMediaQuery("(max-width: 435px)");
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!id) {
      setInvoice(null);
      setHasLoaded(true);
      return;
    }

    const fullInvoice = getFullInvoiceById(id);
    setInvoice(fullInvoice ?? getInvoiceById(id));
    setHasLoaded(true);
  }, [id]);

  if (!hasLoaded) {
    return (
      <section className="flex items-center justify-center min-h-[50vh] text-muted">
        Loading invoice details...
      </section>
    );
  }

  if (!invoice) {
    return (
      <section className="space-y-4">
        <button
          className="flex gap-2 items-center my-3 cursor-pointer"
          onClick={() => router.back()}
        >
          <IoIosArrowBack className="text-button-primary" size={16} />
          <span className="mt-1 font-bold">Go Back</span>
        </button>
        <div className="bg-card rounded-lg p-6 text-muted shadow-sm">
          Invoice details could not be found.
        </div>
      </section>
    );
  }

  const status = invoice.status;

  return (
    <section className="">
      <div className="mb-8">
        <button
          className="flex gap-2 items-center my-3 cursor-pointer"
          onClick={() => router.back()}
        >
          <IoIosArrowBack className="text-button-primary" size={16} />
          <span className="mt-1 font-bold">Go Back</span>
        </button>

        <div className="bg-card px-6 py-8 flex justify-between items-center mt-4 rounded-lg">
          <div className="flex w-full md:w-auto justify-between md:justify-start md:gap-4 items-center">
            <p className="text-muted text-[13px]">Status</p>
            <span
              className={`${
                status === "paid"
                  ? "bg-[#33D69F]/10 text-[#33D69F]"
                  : status === "pending"
                    ? "bg-[#FF9E0A]/10 text-[#FF9E0A]"
                    : "bg-muted/20 text-muted"
              } p-3 space-x-1 w-25 rounded-md flex items-center justify-center`}
            >
              <span className="mb-1">
                <GoDotFill size={16} />
              </span>
              <span className="text-[15px] font-bold">
                {status === "paid"
                  ? "Paid"
                  : status === "pending"
                    ? "Pending"
                    : "Draft"}
              </span>
            </span>
          </div>

          {!isMobile && (
            <div className="flex-1 w-full">
              <FooterBtn
                className="md:justify-end md:gap-2"
                invoice={invoice}
                onInvoiceUpdated={(
                  updatedInvoice: NonNullable<typeof invoice>,
                ) => setInvoice(updatedInvoice)}
                onInvoiceDeleted={() => router.push("/invoices")}
              />
            </div>
          )}
        </div>

        <InvoiceDetails invoice={invoice} />
      </div>

      {isMobile && (
        <FooterBtn
          className="md:justify-end md:gap-2"
          invoice={invoice}
          onInvoiceUpdated={(updatedInvoice: NonNullable<typeof invoice>) =>
            setInvoice(updatedInvoice)
          }
          onInvoiceDeleted={() => router.push("/invoices")}
        />
      )}
    </section>
  );
};

export default ViewInvoiceContent;
