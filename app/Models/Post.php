<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $appends = ["image_url", "date_formatted", "excerpt"];

    /**
     * return the image url to be displayed on react templates
     */
    public function getImageUrlAttribute()
    {
        return $this->image!=""?url("images/posts/" . $this->image):"";
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id')->with(['user', 'post']);
    }

    /**
     * approved comments to be displayed on react website
     */
    public function approvedComments()
    {
        return $this->hasMany(Comment::class, 'post_id')->with(['user', 'post'])->where('approved', 1);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag', 'post_id', 'tag_id');
    }

    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('F d, Y');
    }

    public function getExcerptAttribute()
    {
        return substr(strip_tags($this->content), 0, 100);
    }

}
