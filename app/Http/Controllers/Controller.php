<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function error_return($message, $code){
        return response()->json([
            'code' => $code,
            'success' => false,
            'errors' => $message
        ], $code);
    }

    public function success_return($message, $data, $code){
        return response()->json([
            'code' => $code,
            'success' => true,
            'data' => $data,
            'message' => $message
        ], $code);
    }

    public function user_return($user, $access_token){
        return response()->json([
            'code' => 200,
            'success' => true,
            'user' => $user,
            'access_token' => $access_token,
            'message' => 'Logado'
        ], 200);
    }
}
