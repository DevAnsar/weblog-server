<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
      "user_id",
      "post_id",
      "comment",
      "approved",
    ];
    protected $appends = ['date_formatted'];

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('Y/m/d h:i a');
    }
}
