<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use App\Models\ProfileImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
        $user = User::find($request->user_id);
        
        $profile = new Profile();
        $profile->info = $request->info;
        $profile->role = $request->role;
        $user->profile()->save($profile);
        
        if($request->has('image')){
            $image = new ProfileImage();        
            $name = $request->file('image')->hashName();
            $path = $request->file('image')->store('profile_images');            
            $image->name = $name;
            $image->path = $path;
            $profile->images()->save($image);
        }
        
        return response()->json([
            'path' => $path,
            'name' => $name
            
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id)->with('profile','profile.images')->first();
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function edit(Profile $profile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::find($request->user_id)->with('profile')->first();
        
        $profile = $user->profile;
        $profile->info = $request->info;
        $profile->role = $request->role;
        $user->profile()->save($profile);
        
        if($request->hasFile('image')){
            $images = $profile->images()->get();
            $count = count($images);
            
            if($count > 0) {
                foreach($images as $image) {
                    unlink(public_path().'/'.$image->path);
                    $image->delete();
                }
            }
         
            $image = new ProfileImage();        
            $name = $request->file('image')->hashName();
            $path = $request->file('image')->store('profile_images');            
            $image->name = $name;
            $image->path = $path;
            $profile->images()->save($image);
        }
        $user->profile()->save($profile);
        return response()->json($user);
        //return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }

    public function profileExists($id) {
        $exists = User::find($id)->profile()->exists();
        return response()->json($exists);
    }
}
