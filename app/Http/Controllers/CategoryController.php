<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Página do Inertia
     */
    public function page()
    {
        return Inertia::render('category', [
            'categories' => Category::where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    /**
     * API: Listar
     */
    public function index()
    {
        return response()->json(
            Category::where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->paginate(15)
        );
    }

    /**
     * API: Criar categoria
     */
    public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'name' => 'required|min:2|max:100',
        ]);

        $category = Category::create([
            'name' => $validated['name'],
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Categoria criada!',
            'category' => $category,
        ], 201);

    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'error' => 'Erro ao criar: ' . $e->getMessage(),
        ], 500);
    }
}

    /**
     * API: Mostrar categoria
     */
    public function show(Category $category)
    {
        $this->checkOwner($category);

        return response()->json($category);
    }

    /**
     * API: Atualizar
     */
    public function update(Request $request, Category $category)
    {
        try {
            $this->checkOwner($category);

            $validated = $request->validate([
                'name' => 'required|min:2|max:100',
            ]);

            $category->update([
                'name' => $validated['name'],
            ]);

            return redirect()->back()->with('success', 'Categoria atualizada!');
        } catch (\Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Erro ao atualizar categoria: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * API: Deletar
     */
    public function destroy(Category $category)
    {
        try {
            $this->checkOwner($category);

            $category->delete();

            return redirect()->back()->with('success', 'Categoria deletada!');
        } catch (\Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Erro ao deletar categoria: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * API: Categorias de um usuário específico
     */
    public function showMyCategories($userId)
    {
        try {
            return response()->json(
                Category::where('user_id', $userId)->get()
            );
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Erro ao buscar categorias: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Garante que o usuário é dono da categoria
     */
    private function checkOwner(Category $category)
    {
        if ($category->user_id !== Auth::id()) {
            abort(403, 'Acesso negado');
        }
    }
}
