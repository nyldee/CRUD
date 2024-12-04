<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $table = 'buku'; // Nama tabel
    protected $primaryKey = 'isbn'; // Menggunakan ISBN sebagai kunci utama
    public $incrementing = false; // Jika ISBN bukan auto-incrementing
    protected $keyType = 'string'; // Jika ISBN adalah string
}
