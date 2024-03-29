<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBacklogRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        
        return [
            'title' => 'required|regex:/(^[A-Za-z0-9 ]+$)+/|max:255',
            'category' => 'required',
            'priority' => 'required|numeric',
            'description' => 'required|regex:/(^[A-Za-z0-9 ]+$)+/|max:1000',
            'completed' => 'required| boolean'
        ];
    }
}
