import Category from './categoryInterface';
export default interface newsItem {
    id: string;
    code: string;
    title: string;
    summary: string;
    description: string;
    image: string;
    status: boolean;
    category: Category;
}
