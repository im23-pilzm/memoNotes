import { fetchWithAuth } from '../memoNotesMiddleware/fetchWithAuth';

async function fetchProtecData() {
    try {
        const response = await fetchWithAuth('http://localhost:4000/yourNotes',
            { method: 'GET' });

        if (!response.ok) {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Unauthorized');
        }

        const data = await response.json();
        console.log('Data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export { fetchProtecData };