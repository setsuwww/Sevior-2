import { ChartNoAxesCombined } from "lucide-react";
import AdminLayout from "../dashboard-layouts/AdminLayout";
import PageHeader from "../page-header";
import AreaDiagram from "@/app/(auth)/dashboard/admin/area-diagram";
import StatsDiagram from "@/app/(auth)/dashboard/admin/stats-diagram";

export default function AdminDashboard() {

  return (
    <AdminLayout>
      <PageHeader
        icon={ChartNoAxesCombined}
        title="Daily statistic"
        description="View & record data on Daily"
      />

      <StatsDiagram />

      <div className="mt-4">
        <AreaDiagram />
      </div>
    </AdminLayout>
  );
}
