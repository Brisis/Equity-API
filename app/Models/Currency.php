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
        'user_id'
    ];

    /*Array of Price Values*/

    protected $casts = [
        'values' => 'array'
    ];

    public function prices()
    {
        return $this->hasOne(Price::class);
    }
}
