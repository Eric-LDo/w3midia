// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import categories from './testcategory.json';

import { news } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState } from 'react';
import { NewCard } from '@/components/ui/new-card';

import Category from '@/interfaces/categoryInterface';
import newsItem from '@/interfaces/newsInterfaces';


import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(FilePondPluginImagePreview);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'News',
        href: news().url,
    },
];


interface CategorySelectProps {

  onCategoryChange: (categoryId: string) => void

  placeholder?: string
}

export default function News({



  placeholder = "Selecione uma categoria"
}: CategorySelectProps) {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedStatus, setSelectedStatus] = useState(true)
    const onCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };
    const [News, setNews] = useState({
        id: "",
        code: "",
        title: "",
        summary: "",
        description: "",
        image: "",
        status: true,
        category: {id: "", code: "", name: "", user_id: ""}
    } as newsItem)
    const categoriesList: Category[] = categories;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News" />
            <div className='flex flex-col md:flex-row'>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    {...store.form()}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <input type="hidden" name="image" value={News.image} />
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="title"
                                        name="title"
                                        placeholder="Titulo"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setNews(prev => ({ ...prev, title: e.target.value }))
                                        }
                                    />
                                    <InputError
                                        message={errors.title}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="summary">Summary</Label>
                                    <Input
                                        id="summary"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="summary"
                                        name="summary"
                                        placeholder="Resumo"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setNews(prev => ({ ...prev, summary: e.target.value }))
                                        }
                                    />
                                    <InputError message={errors.summary} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        required
                                        tabIndex={3}
                                        autoComplete="description"
                                        name="description"
                                        placeholder="Description"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setNews(prev => ({ ...prev, description: e.target.value }))
                                        }
                                    />
                                    <InputError message={errors.description} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category">
                                        Category
                                    </Label>
                                    <Select value={selectedCategory} onValueChange={onCategoryChange && ((value: string) => {
                                        onCategoryChange(value);
                                        const selectedCat = categoriesList.find(cat => cat.id === value);
                                        if (selectedCat) {
                                            setNews(prev => ({ ...prev, category: selectedCat }));
                                        }
                                    })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder={placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoriesList.map((category) => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name} ({category.code})
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <InputError
                                        message={errors.category}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FilePond
                                        name="image"
                                        allowMultiple={false}
                                        acceptedFileTypes={["image/*"]}
                                        server={{
                                            process: {
                                                url: "/upload-image",
                                                method: "POST",
                                                headers: {
                                                    "X-CSRF-TOKEN": document
                                                        .querySelector('meta[name="csrf-token"]')
                                                        ?.getAttribute("content") ?? ""
                                                },
                                                onload: (response: string) => {
                                                    try {
                                                        const data = JSON.parse(response);
                                                        const input = document.querySelector('input[name="image"]') as HTMLInputElement | null;
                                                        if (input) {
                                                            input.value = data.path ?? data.id ?? data.url ?? '';
                                                        }
                                                        if (data.url) {
                                                            setNews(prev => ({ ...prev, image: data.url }));
                                                        } else if (data.path) {
                                                            setNews(prev => ({ ...prev, image: `/storage/${data.path}` }));
                                                        }
                                                        return data.path ?? data.id ?? response;
                                                    } catch {
                                                            return response;
                                                        }
                                                }
                                            }
                                        }}
                                        onremovefile={() => {
                                            const input = document.querySelector('input[name="image"]') as HTMLInputElement | null;
                                            if (input) input.value = '';
                                            setNews(prev => ({ ...prev, image: '' }));
                                        }}
                                    />

                                </div>
                                <div className="gap-2 flex flex-row items-center">
                                    <Input
                                        type='radio'
                                        className='w-3'
                                        id="category"
                                        name="category"
                                        value={selectedStatus? 'active' : 'inactive'}
                                        onClick={() => setSelectedStatus(!selectedStatus)}
                                        checked={selectedStatus? true : false}
                                        />
                                    <Label htmlFor="category">
                                        Status {selectedStatus? 'Active' : 'Inactive'}
                                    </Label>
                                </div>


                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Create
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    <NewCard
                        key="1"
                        id="1"
                        code="news1"
                        title={News.title}
                        summary={News.summary}
                        description={News.description}
                        image={News.image}
                        status={News.status}
                        category={News.category}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
