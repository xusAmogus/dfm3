<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Backlog extends Model
{
    use HasFactory;

    Protected $fillable = ['user_id','title','category','priority','description','completed'];
    
    //query scopes to keep query calls readable in controller
    public function scopeCompleted($query)
    {
        return $query->where('completed', '=', 1);
    }
    public function scopeToday($query)
    {
        return $query->where('updated_at', '>=', Carbon::today())->where('updated_at','<=', Carbon::now());
    }

    public function scopeWeekly($query) {
        return $query->where('completed',1)->where('updated_at','<=', Carbon::now()->subDays(7));
    }
    public function scopeMonthly($query) {
        return $query->where('completed',1)->where('updated_at','<=', Carbon::now()->subMonth());
    }
    public function scopeYearly($query) {
        return $query->where('completed',1)->where('updated_at','<=', Carbon::now()->subYear());
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}
