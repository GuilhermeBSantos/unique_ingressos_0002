<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = 'ticket';

    public function verify_available($quantity, $user){
        $available = $this->available_quantity - $quantity;

        if($available < 0){
            return false;
        }
        else if(($user->quantity_sales($this) + $quantity) > $this->max_per_user ){
            return false;
        }
        else if($this->max_per_user < $quantity){
            return false;
        }
        else{
            return true;
        }
    }

    public function get_amount($quantity){
        $amount = $this->amount * $quantity;

        return $amount;
    }

    
    public function purchase_quantity($quantity){
        $this->available_quantity = $this->available_quantity - $quantity;
        $this->save();

        return true;
    }
}
