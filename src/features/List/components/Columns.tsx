import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { listItemsType } from "../types/items";

export function getColumns(
  handleEdit: (item: listItemsType) => void,
  handleDelete: (id: number) => void
): ColumnDef<listItemsType>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-mono text-xs">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "title",
      header: "title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "subTitle",
      header: "subTitle",
      cell: ({ row }) => (
        <div className="lowercase text-muted-foreground">
          {row.getValue("subTitle")}
        </div>
      ),
    },
    {
      accessorKey: "dateCreated",
      header: "dateCreated",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.dateCreated}
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-muted"
                size="sm"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleEdit(item)}
                className="cursor-pointer flex items-center gap-2 px-2 py-1"
              >
                <Pencil className="h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(item.id)}
                className="cursor-pointer flex items-center gap-2 px-2 py-1"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="text-destructive">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
