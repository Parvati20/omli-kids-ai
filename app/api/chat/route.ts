import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_NVIDIA_API_KEY) {
      return NextResponse.json(
        { error: 'Missing NVIDIA API key' },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));

    if (!body?.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    const model =
      body.model ||
      process.env.NVIDIA_MODEL ||
      'meta/llama-3.1-8b-instruct';

    const requestBody = {
      model,
      messages: body.messages,
      temperature: body.temperature,
      max_tokens: body.max_tokens,
      top_p: body.top_p,
      presence_penalty: body.presence_penalty,
      frequency_penalty: body.frequency_penalty,
      stream: Boolean(body.stream),
    };

    const fetchWithTimeout = async (timeoutMs: number) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        return await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NVIDIA_API_KEY}`,
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }
    };

    let response = await fetchWithTimeout(12000);
    if (!response.ok && response.status >= 500) {
      response = await fetchWithTimeout(12000);
    }

    if (body.stream) {
      if (!response.ok) {
        const text = await response.text();
        let data: any = null;
        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = null;
        }
        return NextResponse.json(
          {
            error: 'Upstream error',
            status: response.status,
            details: data || text || 'No response body',
          },
          { status: response.status }
        );
      }

      if (!response.body) {
        return NextResponse.json(
          { error: 'Upstream error', details: 'No response stream' },
          { status: 502 }
        );
      }

      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
    }

    const text = await response.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'Upstream error',
          status: response.status,
          details: data || text || 'No response body',
        },
        { status: response.status }
      );
    }

    console.log('API Response:', JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Upstream timeout', details: 'Request timed out after 12s' },
        { status: 504 }
      );
    }
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to process request', details: errorMessage },
      { status: 500 }
    );
  }
}
