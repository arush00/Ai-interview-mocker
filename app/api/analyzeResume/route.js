export async function POST(req) {
  // Log the incoming headers for debugging
  console.log('Request Headers:', Object.fromEntries(req.headers));

  // Check if the content type is correct
  const contentType = req.headers.get('content-type');
  if (!contentType || !contentType.includes('multipart/form-data')) {
    return new Response(
      JSON.stringify({ error: 'Invalid Content-Type. Expected multipart/form-data' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const formData = await req.formData();
    const resume = formData.get('resume');

    if (!resume) {
      return new Response(JSON.stringify({ error: 'No resume file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Forward the request to the Flask backend
    const backendResponse = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      body: formData, // Pass the FormData directly
    });

    const data = await backendResponse.json();
    if (backendResponse.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify(data), {
        status: backendResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}