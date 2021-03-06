<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;
    protected $fillable = [
    	'country',
    	'iso_code',
        'user_id',
        'date',
        'current_value'
    ];

    /*Array of Price Values*/

    public function prices()
    {
        return $this->hasMany(Price::class);
    }
}
