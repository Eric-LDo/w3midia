/* eslint-disable react-hooks/set-state-in-effect */
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Form, Head, } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

import { useEffect, useState } from 'react';
import CategoryEdit from '@/components/category-edit';
import Cat from '@/interfaces/categoryInterface';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Category', href: '/category' },
];

export default function Category() {
    // PEGANDO CATEGORIAS DO INERTIA
    const [categories, setCategories] = useState<Cat[]>([]);
    async function loadMyCategories() {
    const response = await fetch('/api/categories/my', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    return data.categories;
}

    const [name, setName] = useState('');

    // Limpa o input após criar
    useEffect(() => {
        loadMyCategories().then(setCategories);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4">Create Category</h1>

                <div className="flex flex-col md:flex-row">
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                        {/* FORM DE CRIAÇÃO VIA INERTIA */}
                        <Form
                            method="post"
                            action="/api/categories"
                            className="flex flex-col gap-4"
                        >
                            <Input
                                type="text"
                                name="name"
                                placeholder="Nome da categoria"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Button type="submit" className="w-full">
                                Criar Categoria
                            </Button>
                        </Form>

                        {/* LISTA */}
                        <div className="flex flex-col gap-2 mt-4">
                            {categories?.map((item) => (
                                <CategoryEdit key={item.id} category={item} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
