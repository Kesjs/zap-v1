import Spinner from "@/components/ui/spinner";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen w-full bg-[var(--background)] flex items-center justify-center">
      <Spinner size="md" />
    </div>
  );
}
