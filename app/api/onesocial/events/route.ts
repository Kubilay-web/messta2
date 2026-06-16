import axios from 'axios';

export async function GET(req: Request) {
  const API_KEY = process.env.EVENT_API_KEY;
  const API_URL = 'https://www.eventbriteapi.com/v3/events/search/';

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        'location.address': 'Istanbul',
        'start_date.range_start': '2025-12-01T00:00:00Z',
        'start_date.range_end': '2025-12-31T23:59:59Z',
        page: 1,
        page_size: 10,
      },
    });

    return new Response(JSON.stringify(response.data.events), { status: 200 });
  } catch (error) {
    console.error('Eventbrite API Error:', error.response?.data || error.message);
    return new Response(
      JSON.stringify({
        error: 'Etkinlik verisi alınırken bir hata oluştu.',
        details: error.response?.data || error.message,
      }),
      { status: 500 }
    );
  }
}