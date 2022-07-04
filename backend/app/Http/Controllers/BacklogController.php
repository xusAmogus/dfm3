<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBacklogRequest;
use App\Http\Requests\UpdateBacklogRequest;
use App\Models\Backlog;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

class BacklogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $backlogs = Backlog::all();
        return response()->json($backlogs);
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
     * @param  \App\Http\Requests\StoreBacklogRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBacklogRequest $request)
    {
        //dd($request->safe()->all());
        $validated = $request->safe()->all();
        //dd($validated);
        Backlog::create($validated);
        
        return response()->json([
            'message' => 'storing backlog'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function show(Backlog $backlog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function edit(Backlog $backlog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBacklogRequest  $request
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBacklogRequest $request, Backlog $backlog)
    {
            
            if($request->origin === 'complete') {
                $backlog->completed = (int) $request->safe()->only(['completed'])['completed'];
                $backlog->save();
            } 
            if($request->origin === 'edit') {
                $backlog->update($request->validated());
                $backlog->save();
                return response()->json(['msg' => 'succes']);
            }        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $backlog = Backlog::find($id);
        $backlog->delete();    
    }

    public function completed($interval) {
        switch($interval){
            case 'daily':
                $count = Backlog::completed()->today()->get()->count();
            
                return response()->json($countable = [
                    "count" => $count,
                    "interval" => $interval
                ]);
                break;
            case 'weekly':
                $count = Backlog::weekly()->get()->count();
            
                return response()->json($countable = [
                    "count" => $count,
                    "interval" => $interval
                ]);
                break;
            case 'monthly':
                $count = Backlog::monthly()->get()->count();
            
                return response()->json($countable = [
                    "count" => $count,
                    "interval" => $interval
                ]);
                break;
            case 'yearly':
                $count = Backlog::yearly()->get()->count();
            
                return response()->json($countable = [
                    "count" => $count,
                    "interval" => $interval
                ]);
                break;
            default:
                $count = Backlog::completed()->today()->get()->count();
                
                return response()->json($countable = [
                    "count" => $count,
                    "interval" => $interval
                ]);
        }
         
    }
    
}
