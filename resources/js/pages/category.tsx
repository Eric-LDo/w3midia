/* eslint-disable react-hooks/set-state-in-effect */
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import CategoryInt from '@/interfaces/categoryInterface';
import { type BreadcrumbItem } from '@/types';

import { Form, Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

import { useEffect, useState } from 'react';
import CategoryEdit from '@/components/category-edit';



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Category', href: '/category' },
];

export default function Category() {

    const submit = () => {
    router.post("/api/categories", {
        name
    }, {
        onSuccess: () => setName("")
    });
    };

    const { categories } = usePage().props   as {
        categories?: CategoryInt[];
        userId?: string;
        error?: string;
    };
    const [name, setName] = useState('');

    useEffect(() => {
        setName('');
    }, [categories]);
     console.log('Categories:', categories);
    console.log('User ID:', usePage().props.userId);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />

            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-4">Create Category</h1>

                <div className="flex flex-col md:flex-row">
                    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

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

                            <Button type="submit" className="w-full">Criar Categoria</Button>
                        </Form>

                        {/* LIST */}
                        <div className="flex flex-col gap-2 mt-4">
                            {(categories || []).map((item) => (

                                <CategoryEdit key={item.id} category={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
