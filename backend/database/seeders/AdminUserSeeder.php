<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@gmail.com',
            'role' => User::ROLE_ADMIN,
            'username' => 'admin',
            'mobile' => '1234567890', // Provide a valid mobile number here if required
            'date_of_birth' => now()->subYears(30), // Example date of birth, adjust as needed
            'password' => Hash::make('admin@123'),
        ]);
    }
}
