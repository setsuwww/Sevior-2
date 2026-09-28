import { getDevelopers } from "@/_lib/services/admin-service/users/developer.server";

import DevelopersPageClient from "./page-client";

import { SectionHeader } from "@/_components/ui/common/SectionHeader";
import { Code2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/_components/ui/button";

export default async function DevelopersPage() {
  const developers = await getDevelopers();

  return (
    <div className = "p-6">
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader
          icon={Code2}
          title="Developers"
          description="Manage agency developers."
        />

        <Link href="/dashboard/admin/users/developers/create">
          <Button type="button">
            <Plus />
            Add Developer
          </Button>
        </Link>
      </div>
      <DevelopersPageClient initialDevelopers={developers} />
    </div>
  )
}
