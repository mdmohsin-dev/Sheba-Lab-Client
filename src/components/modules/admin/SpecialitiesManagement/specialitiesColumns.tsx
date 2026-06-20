import { ISpecialty } from "@/types/specialities.interface";
import Image from "next/image";
import { Column } from "../../shared/ManagementTable";

export const specialitiesColumns: Column<ISpecialty>[] = [
  {
    header: "Icon",
    accessor: (speciality) => (
      <Image
        src={speciality.icon}
        alt={speciality.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Title",
    accessor: (speciality) => speciality.title,
  },
];