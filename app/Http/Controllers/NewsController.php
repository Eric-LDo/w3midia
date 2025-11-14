<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
        $items = News::with('category')->orderBy('created_at', 'desc')->paginate(15);
        return response()->json($items);
    }

    public function store(StoreNewsRequest $request)
    {
        $data = $request->validated();
        // map status default
        if (! array_key_exists('status', $data)) {
            $data['status'] = true;
        }

        $news = News::create($data);
        return response()->json($news, 201);
    }

    public function show(News $news)
    {
        return response()->json($news->load('category'));
    }

    public function update(StoreNewsRequest $request, News $news)
    {
        $news->update($request->validated());
        return response()->json($news);
    }

    public function destroy(News $news)
    {
        $news->delete();
        return response()->json(null, 204);
    }
}
