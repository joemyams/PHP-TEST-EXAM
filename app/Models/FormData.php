<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormData extends Model
{
    protected $fillable = [
        'text_input',
        'radio_value',
        'checkbox_values',
        'image_path',
    ];

    protected $casts = [
        'checkbox_values' => 'json',
    ];
}
