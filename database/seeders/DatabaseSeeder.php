<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $ticket = new Ticket();
        $ticket->name_ticket = 'Homem aranha sem volta para casa';
        $ticket->max_per_user = 5;
        $ticket->amount = 30.00;
        $ticket->available_quantity = 15;
        $ticket->save();
        
        $ticket = new Ticket();
        $ticket->name_ticket = 'Show do Bryan Adams';
        $ticket->max_per_user = 5;
        $ticket->amount = 30.00;
        $ticket->available_quantity = 15;
        $ticket->save();
    }
}
