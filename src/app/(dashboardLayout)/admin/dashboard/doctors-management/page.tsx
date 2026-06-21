import DoctorFilters from "@/components/modules/admin/DoctorsManagement/DoctorFilters";
import DoctorsManagementHeader from "@/components/modules/admin/DoctorsManagement/DoctorsManagementHeader";
import DoctorsTable from "@/components/modules/admin/DoctorsManagement/DoctorsTable";
import RefreshButton from "@/components/modules/shared/RefreshButton";
import SearchFilter from "@/components/modules/shared/SearchFilter";
import SelectFilter from "@/components/modules/shared/SelectFilter";
import TablePagination from "@/components/modules/shared/TablePagination";
import { TableSkeleton } from "@/components/modules/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { ISpecialty } from "@/types/specialities.interface";
import { Suspense } from "react";

const AdminDoctorsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}
  const specialitiesResult = await getSpecialities();
  const doctorsResult = await getDoctors(queryString);
  const totalPages = Math.ceil(
    doctorsResult.meta.total / doctorsResult.meta.limit
  );
  return (
    <div className="space-y-6">
      <DoctorsManagementHeader specialities={specialitiesResult.data} />
      {/* <div className="flex space-x-4">
        <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
        <SelectFilter
          paramName="speciality" // ?speciality="Cardiology"
          options={specialitiesResult.data.map((speciality: ISpecialty) => ({
            label: speciality.title,
            value: speciality.title,
          }))}
          placeholder="Filter by speciality"
        />
        <RefreshButton />
      </div> */}
      <DoctorFilters specialties={specialitiesResult?.data}></DoctorFilters>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <DoctorsTable
          doctors={doctorsResult.data}
          specialities={specialitiesResult.data}
        />
        <TablePagination
          currentPage={doctorsResult.meta.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default AdminDoctorsManagementPage;