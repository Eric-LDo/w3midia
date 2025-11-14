import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { Form } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import categoriesList  from '../pages/testcategory.json'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState } from 'react';
import { NewCard } from '@/components/ui/new-card';

import newsItem from '@/interfaces/newsInterfaces';

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
interface EditNewsProps {
    key: string;
    newsItem: newsItem;

}

export default function EditNews({ newsItem, key}: EditNewsProps) {
    const [News, setNews] = useState<newsItem>(newsItem);
    const [isOpenEditnews, setIsOpenEditnews] = useState<boolean>(false);
   const [selectedCategory, setSelectedCategory] = useState("")
       const [selectedStatus, setSelectedStatus] = useState(true)
       const onCategoryChange = (value: string) => {
           setSelectedCategory(value);
       };
    const toggleIsOpenEditnews = () => { setIsOpenEditnews(!isOpenEditnews); }

    return (
        <div className='w-full mb-10 border p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md m-2 flex justify-center items-center flex-col'>
                        <div className='w-full flex justify-end items-center'><Pencil onClick={toggleIsOpenEditnews} className='hover:text-blue-800 cursor-pointer '/> <Trash2 className='hover:text-red-700 text-red-900 cursor-pointer ' /> </div>
                        <div key={key} className='flex flex-col md:flex-row'>
                        <div className={`flex h-full flex-1 flex-col gap-4  rounded-xl p-4 ${isOpenEditnews ? '' : 'hidden'}`}>
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
                                                value={News.title}
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
                                                value={News.summary}
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
                                                value={News.description}
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
                                            <Select value={News.category.id ? News.category.id : selectedCategory} onValueChange={onCategoryChange && ((value: string) => {
                                                onCategoryChange(value);
                                                const selectedCat = categoriesList.find(cat => cat.id === value);
                                                if (selectedCat) {
                                                    setNews(prev => ({ ...prev, category: selectedCat }));
                                                }
                                            })}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={'Select a category'} />
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
                                                labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                                                files={News.image ? [News.image] : []}
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
                                            Edit
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
                    </div>
    );
}
