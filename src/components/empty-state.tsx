import { EmptyStateProps } from "@/types";
import Image from "next/image";

const EmptyState = ({ text, description }: EmptyStateProps) => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <Image src={"/mail_dark.svg"} alt="Mail" width={241} height={200} />
      <p className="font-bold text-2xl">{text}</p>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default EmptyState;
