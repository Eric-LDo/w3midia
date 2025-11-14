// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { NewCard } from '@/components/ui/new-card';
import news from './testnews.json';
import AppLayout from '@/layouts/app-layout';
import { homepage } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import newsItem from '@/interfaces/newsInterfaces';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: homepage().url,
    },
];



export default function Home() {
    const newsList: newsItem[] = news;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4  rounded-xl p-4">
                 <div  className={`flex  gap-5 flex-col w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 overflow-x-scroll `}>
                    {
                        newsList.map((item) => (
                            <NewCard
                                key={item.id}
                                id={item.id}
                                code={item.code}
                                title={item.title}
                                summary={item.summary}
                                description={item.description}
                                image={item.image}
                                status={item.status}
                                category={item.category}
                            />
                        ))
                    }

                </div>
            </div>
        </AppLayout>
    );
}
