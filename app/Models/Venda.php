<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venda extends Model
{
    use HasFactory;
    protected $table = 'vendas';

    public function ticket(){
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }
}
