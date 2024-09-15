<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'avatar',
        'role_id',
        'google_id',
        'gender_id',
        'birthday',
        'slug',
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'birthday' => 'date',  // Cast 'birthday' to date
        'created_at' => 'datetime',  // Cast 'created_at' to datetime
        'updated_at' => 'datetime',  // Cast 'updated_at' to datetime
        'password' => 'hashed',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function likes()
    {
        return $this->belongsToMany(Like::class);
    }

    public function savedArticles()
    {
        return $this->belongsToMany(Article::class, 'bookmarks');
    }
}

