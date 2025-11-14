import Category from "@/interfaces/categoryInterface";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

interface Props {
    key: string
    category: Category;
}
export default function CategoryEdit({ category }:Props) {
    const [editing, setEditing] = useState<Category | null>(null);
    const [editName, setEditName] = useState(category.name);
    useEffect(() => {

    },[editing]);
    // DELETE CATEGORY (Inertia)
    const handleDelete = (id: string) => {
        if (!confirm('Tem certeza que deseja excluir?')) return;

        router.delete(`/api/categories/${id}`);
    };

    // EDITAR (Inertia)
    const submitEdit = (id: string,) => {


        router.put(`/api/categories/${id}`, {
            name: editName,
        }, {
            onSuccess: () => setEditing(null),
        });
    };
    return (
        <div key={category.id} className="p-4 border rounded-md flex justify-between flex-col sm:flex-row items-center gap-4">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Nome da categoria"
                                        required
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}

                                    />

                                    <div className="flex gap-2 items-center">
                                        <Pencil
                                            className="hover:text-blue-800 cursor-pointer"
                                            onClick={() => {
                                                setEditing(category);
                                                submitEdit(category.id);
                                            }}
                                        />
                                        <Trash2
                                            className="hover:text-red-700 cursor-pointer"
                                            onClick={() => handleDelete(category.id)}
                                        />
                                    </div>
                                </div>
    );
}
