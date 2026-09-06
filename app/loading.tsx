import Spinner from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#000000] flex items-center justify-center">
      <Spinner size="md" />
    </div>
  );
}
