<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    // opcional: proteger com sanctum/middleware auth:api
    public function index(Request $request): JsonResponse
    {
        $categories = Category::paginate(15);
        return response()->json([
            'data' => CategoryResource::collection($categories)->response()->getData(true),
        ]);
    }

    public function store(CategoryRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] ??= $request->input('user_id');
        $category = Category::create($data);
        return response()->json(new CategoryResource($category), 201);
    }

    public function show(Category $category): JsonResponse
    {
        return response()->json(new CategoryResource($category));
    }

    public function update(CategoryRequest $request, Category $category): JsonResponse
    {
        $category->update($request->validated());
        return response()->json(new CategoryResource($category));
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json(null, 204);
    }
}
