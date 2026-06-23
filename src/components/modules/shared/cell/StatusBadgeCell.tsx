"use client";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeCellProps {
  isdeleted?: boolean;
  activeText?: string;
  deletedText?: string;
}

export function StatusBadgeCell({
  isdeleted,
  activeText = "Active",
  deletedText = "Deleted",
}: StatusBadgeCellProps) {
  return (
    <Badge variant={isdeleted ? "destructive" : "default"}>
      {isdeleted ? deletedText : activeText}
    </Badge>
  );
}