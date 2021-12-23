<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*@jheckdoc
        {
            "method" : "POST",
            "route" : "/v1/users/login",
            "name":"User login",
            "description": "Realização de Login, será gerado um token com autenticação.",
            "group":"user",
            "headers":{
                "Content-Type": {
                    "required": true,
                    "value":"application/x-www-form-urlencoded"
                }
            },
            "params" : {
                "email" :{
                    "type":"string",
                    "description": "Insira seu E-mail",
                    "required" : true
                },
                "password" :{
                    "type":"string",
                    "description": "Insira sua Senha",
                    "required" : true
                }
            },
            "responses": {
                "200": {
                    "description": "Success"
                },
                "401": {
                    "description": "Unauthenticated"
                }
            }
        }
    */

    public function login(Request $request){
        $credentials = array(
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        );
        
        if (Auth::attempt($credentials)) {
            return $this->error_return('Credenciais Invalidas', 401);
        }

        //$auth = auth()->user();
        
        $user = Auth::getProvider()->retrieveByCredentials($credentials);

        $token = $user->createToken('API Token');

        return $this->user_return($user, $token->plainTextToken);
    }
}
