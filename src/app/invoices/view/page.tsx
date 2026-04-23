"use client";
import FooterBtn from "@/components/common/footerBtn";
import InvoiceDetails from "@/components/invoiceDetails";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

const ViewInvoice = () => {
  const router = useRouter();
  const status =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;
  const isModile = useMediaQuery("(max-width: 435px)");

  return (
    <section className="">
      <div className=" mb-8">
        <button
          className="flex gap-2 items-center my-3 cursor-pointer"
          onClick={() => router.back()}
        >
          <IoIosArrowBack className="text-button-primary" size={16} />
          <span className="mt-1 font-bold">Go Back</span>
        </button>

        <div className="bg-card px-6 py-8 flex justify-between items-center mt-4 rounded-lg">
          <div
            className={`flex w-full md:w-auto justify-between md:justify-start md:gap-4 items-center`}
          >
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

          {!isModile && (
            <div className="flex-1 w-full">
              <FooterBtn className="md:justify-end md:gap-2" />
            </div>
          )}
        </div>

        <InvoiceDetails />
      </div>

      {isModile && <FooterBtn />}
    </section>
  );
};

export default ViewInvoice;
