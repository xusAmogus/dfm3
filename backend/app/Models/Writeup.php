<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Writeup extends Model
{
    use HasFactory;

    protected $fillable = ['title','subtitle','content','link'];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
