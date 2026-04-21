"use client";
import InvoiceDetails from "@/components/invoiceDetails";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

const ViewInvoice = () => {
  const router = useRouter();
  return (
    <div className="p-4">
      <button
        className="flex gap-2 items-center my-3 cursor-pointer"
        onClick={() => router.back()}
      >
        <IoIosArrowBack color="#7C5DFA" size={16} />
        <span className="mt-1 font-bold">Go Back</span>
      </button>

      <div className="bg-white px-6 py-8 flex justify-between items-center mt-4 rounded-lg">
        <p className="text-[#858BB2] text-[13px]">Status</p>
        <span
          className={`${
            status === "paid"
              ? "bg-[#33D69F]/10 text-[#33D69F]"
              : status === "pending"
                ? "bg-[#FF9E0A]/10 text-[#FF9E0A]"
                : "bg-[#373B53]/10 text-[#373B53]"
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

      <InvoiceDetails />
    </div>
  );
};

export default ViewInvoice;
