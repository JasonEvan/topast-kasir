import EditMenuPageClient from "@/components/EditMenuPageClients";

export default async function EditMenuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <EditMenuPageClient id={id} />;
    </div>
  );
}
