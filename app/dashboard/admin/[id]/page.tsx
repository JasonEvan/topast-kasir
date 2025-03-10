import EditAdminPageClient from "@/components/EditAdminPageClients";

export default async function EditAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditAdminPageClient id={id} />;
}
