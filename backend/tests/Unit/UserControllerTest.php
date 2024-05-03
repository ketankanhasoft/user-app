<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthorized_access_to_user_list(): void
    {
        $response = $this->getJson('/api/users');
        $response->assertUnauthorized();
    }

    public function test_authorized_access_to_user_list(): void
    {
        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'password' => Hash::make('admin@demo')]);
        $response = $this->actingAs($admin)->getJson('/api/users');
        $response->assertOk();
    }

    public function test_unauthorized_creation(): void
    {
        $response = $this->postJson('/api/users', []);
        $response->assertUnauthorized();
    }

    public function test_authorized_creation(): void
    {
        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'password' => Hash::make('demo@123')]);
        $userData = [
            "first_name" => "Demo",
            "email" => rand(1111, 9999) . "demo@demogmail.com",
            "password" => Hash::make("demo@123"),
            "username" => rand(1111, 9999) . "demousername",
            "role" => User::ROLE_USER,
        ];
        $response = $this->actingAs($admin)->postJson('/api/users', $userData);
        $response->assertCreated();
    }

    public function test_show_user(): void
    {
        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'password' => Hash::make('admin@demo')]);
        $user =  User::factory()->make(['role' => User::ROLE_USER, 'password' => Hash::make('user@123')]);
        $response = $this->actingAs($admin)->getJson('/api/users/' . $user->id);
        $response->assertOk();
    }

    public function test_delete_user(): void
    {
        $admin = User::factory()->create(['role' => User::ROLE_ADMIN, 'password' => Hash::make('admin@demo')]);
        $user = User::factory()->create(['role' => User::ROLE_USER, 'password' => Hash::make('user@demo')]);
        $response = $this->actingAs($admin)->deleteJson('/api/users/' . $user->id);
        $response->assertNoContent();
    }
}
