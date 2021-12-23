<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request){
        $full_name = $request->get('full_name');
        $email = $request->get('email');

        $list = new User();
        
        if($full_name){
            $list = $list->where('full_name', 'LIKE', "%{$full_name}%");
        }

        if($email){
            $list = $list->where('email', 'LIKE', "%{$email}%");
        }

        return $list->get();
    }
    
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|max:16|min:8'
        ]);

        if($validator->fails()){
            return $this->error_return($validator->errors()->first(), 400);
        }

        try{
            $user = new User();
            $user->full_name = $request->get('full_name');
            $user->email = $request->get('email');
            $user->password = bcrypt($request->get('password'));
            $user->access_user = 'user';
            $user->save();

            return $this->success_return('Cadastrado com sucesso', $user, 200);
                
        }
        catch(Exception $ex){
            return $this->error_return($ex->getMessage(), 400);
        }
    }
}
