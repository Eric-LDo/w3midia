<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Página principal (Inertia)
     * O React faz o fetch das categorias depois.
     */
    public function page()
    {
        return Inertia::render('category');
    }


    /**
     * API: Retorna apenas as categorias do usuário autenticado (JSON)
     */
    public function myCategories()
    {
        try {
            $categories = Category::where('user_id', Auth::id())
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'categories' => $categories
            ], 200);

        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Erro ao carregar categorias: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * API: Criar categoria (via Inertia <Form>)
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|min:2|max:100',
            ]);

            Category::create([
                'name'     => $validated['name'],
                'user_id'  => Auth::id(),
            ]);

            return redirect()->back()->with('success', 'Categoria criada!');

        } catch (\Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Erro ao criar categoria: ' . $e->getMessage()
            ]);
        }
    }


    /**
     * API: Mostrar categoria específica
     */
    public function show(Category $category)
    {
        $this->checkOwner($category);
        return response()->json($category);
    }


    /**
     * API: Atualizar categoria
     */
    public function update(Request $request, Category $category)
    {
        try {
            $this->checkOwner($category);

            $validated = $request->validate([
                'name' => 'required|min:2|max:100',
            ]);

            $category->update([
                'name' => $validated['name']
            ]);

            return redirect()->back()->with('success', 'Categoria atualizada!');

        } catch (\Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Erro ao atualizar: ' . $e->getMessage()
            ]);
        }
    }


    /**
     * API: Excluir categoria
     */
    public function destroy(Category $category)
    {
        try {
            $this->checkOwner($category);
            $category->delete();

            return redirect()->back()->with('success', 'Categoria deletada!');

        } catch (\Throwable $e) {
            return redirect()->back()->withErrors([
                'error' => 'Erro ao excluir: ' . $e->getMessage()
            ]);
        }
    }


    /**
     * Função privada para garantir que a categoria pertence ao usuário logado
     */
    private function checkOwner(Category $category)
    {
        if ($category->user_id !== Auth::id()) {
            abort(403, 'Acesso negado');
        }
    }
}
