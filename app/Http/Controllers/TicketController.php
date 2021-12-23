<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use App\Models\Venda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class TicketController extends Controller
{
    public function index(){
        $index = Ticket::get();

        return $index;
    }

    public function my_sales(){
        $index = Venda::with('ticket')->where('user_id', Auth::id())->get();

        return $index;
    }

    public function purchase(Request $request){
        $validator = Validator::make($request->all(), [
            'ticket_id' => 'required|integer',
            'quantity' => 'required|integer'
        ]);

        if($validator->fails()){
            return $this->error_return($validator->errors()->first(), 400);
        }

        $user_id = Auth::id();

        $user = User::find($user_id);
        $ticket = Ticket::find($request->get('ticket_id'));
        

        if(!$ticket){
            return $this->error_return('Ticket não encontrado', 400);
        }
        else if($ticket->verify_available($request->get('quantity'), $user) == false){
            return $this->error_return('Quantidade não disponivel', 400);
        }
        else{
            $venda = new Venda();
            $venda->user_id = Auth::id();
            $venda->ticket_id = $request->get('ticket_id');
            $venda->quantity = $request->get('quantity');
            $venda->amount = $ticket->get_amount($request->get('quantity'));
            $venda->save();

            $ticket->purchase_quantity($request->get('quantity'));
        }

        return $this->success_return('Compra realizada com sucesso', $venda, 200);
    }
}
