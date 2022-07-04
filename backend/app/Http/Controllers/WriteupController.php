<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWriteupRequest;
use App\Http\Requests\UpdateWriteupRequest;
use App\Models\Writeup;

class WriteupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $writeups = Writeup::all();
        return response()->json($writeups);
    }

  
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreWriteupRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWriteupRequest $request)
    {
        $writeup = auth()->user()->writeups()->create($request->safe());
        return response()->json($writeup);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Writeup  $writeup
     * @return \Illuminate\Http\Response
     */
    public function show(Writeup $writeup)
    {
        $writeup = Writeup::findOrFail($writeup->id);
        return response()->json($writeup);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Writeup  $writeup
     * @return \Illuminate\Http\Response
     */
    public function edit(Writeup $writeup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateWriteupRequest  $request
     * @param  \App\Models\Writeup  $writeup
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateWriteupRequest $request, Writeup $writeup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Writeup  $writeup
     * @return \Illuminate\Http\Response
     */
    public function destroy(Writeup $writeup)
    {
        //
    }
}
