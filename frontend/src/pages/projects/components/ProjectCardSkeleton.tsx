import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[14px] border-[#e1dcff] bg-white py-0 shadow-[0_12px_30px_rgba(72,56,178,0.06)]">
      <Skeleton className="h-28 w-full rounded-none bg-[#eeeaff]" />

      <CardHeader className="space-y-3 px-4 pt-4 pb-0">
        <Skeleton className="h-5 w-2/3 bg-[#eeeaff]" />
      </CardHeader>

      <CardContent className="space-y-4 px-4 pt-2 pb-4">
        <Skeleton className="h-4 w-full bg-[#eeeaff]" />

        <Skeleton className="h-4 w-5/6 bg-[#eeeaff]" />

        <Skeleton className="h-2 w-full rounded-full bg-[#eeeaff]" />
      </CardContent>
    </Card>
  );
}
