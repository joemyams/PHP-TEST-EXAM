<?php

namespace App\Http\Controllers;

use Log;
use App\Models\FormData;
use Illuminate\Http\Request;

class FormDataController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'text_input' => 'required',
                'radio_value' => 'required',
                'checkbox_values' => 'required',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Log request data for debugging
            \Log::info('Form Data Request:', $request->all());

            $imagePath = $request->file('image')->store('images', 'public');

            FormData::create([
                'text_input' => $request->input('text_input'),
                'radio_value' => $request->input('radio_value'),
                'checkbox_values' => is_array($request->input('checkbox_values'))
                    ? $request->input('checkbox_values')
                    : json_decode($request->input('checkbox_values')),
                'image_path' => $imagePath,
            ]);

            \Log::info('Form data stored successfully');

            return response()->json(['message' => 'Form data stored successfully']);
        } catch (\Exception $e) {
            // Log the exception
            \Log::error('Failed to store form data: ' . $e->getMessage());

            return response()->json(['error' => 'Failed to store form data'], 500);
        }
    }

    public function getFormData()
{
    try {
        $formData = FormData::latest()->first(); // Fetch the latest form data

        // Append the full URL for the image
        $formData->image_url = asset('storage/' . $formData->image_path);

        return response()->json(['data' => $formData]);
    } catch (\Exception $e) {
        // Log the exception
        \Log::error('Failed to fetch form data: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to fetch form data'], 500);
    }
}


}
