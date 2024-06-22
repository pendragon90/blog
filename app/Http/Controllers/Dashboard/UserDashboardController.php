<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserDashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = User::query();
        
        $minDate = User::min('created_at');
        $maxDate = User::max('created_at');
    
        // Filter berdasarkan tanggal
        if ($request->query('date')) {
            $date = $request->query('date');
            $query->whereDate('created_at', $date);
        }
    
      
    
        // Filter berdasarkan pencarian
        if ($search !== '' || $search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    
      
    
        // Ambil artikel dengan pagination
        $users = $query->paginate($request->query('perpage') ?? 20);
    
        return inertia('Dashboard/UsersDashboardPage', [
            'minDate' => $minDate,
            'maxDate' => $maxDate,
            'users' => UserResource::collection($users),
        ]);
    }
}
