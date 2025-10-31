import { useState } from "react";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import UserAlertDialog from "../components/AlertDialog";
import UserTable from "../components/BaseTable";
import { DialogForm } from "../components/DialogForm";
import type { listItemsType } from "../types/user";
import { toast } from "sonner";

export default function Users() {
  const [items, setItems] = useState<listItemsType[]>([]);
  const [editItem, setEditItem] = useState<listItemsType | null>(null);
  const navigate = useNavigate();

  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = () => {
    if (pendingDeleteId == null) return;
    setItems((prev) => prev.filter((item) => item.id !== pendingDeleteId));
    toast.success("item deleted successfully");
    setPendingDeleteId(null);
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <UserAlertDialog
        open={pendingDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDeleteId(null);
        }}
        onConfirm={confirmDelete}
        title="Delete item?"
        description={
          "This action cannot be undone. This will permanently delete the item from your account."
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  List Management
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage and explore {items?.length} item
                </p>
              </div>
            </div>
            <DialogForm
              setItems={setItems}
              EditItem={editItem}
              onClose={() => setEditItem(null)}
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <UserTable
            handleDelete={handleDelete}
            handleEdit={(item) => setEditItem(item)}
            data={items}
          />
        </div>
      </div>
    </div>
  );
}
