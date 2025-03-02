import { fetchWithAuth } from './fetchWithAuth.js';

async function fetchProtecData() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
        console.error('User ID not found in local storage');
        return;
    }

    try {
        const response = await fetchWithAuth(`http://localhost:4000/user/${userId}/yourNotes`, { method: 'GET' });

        if (!response.ok) {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error('Unauthorized');
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('text/html')) {
            const html = await response.text();
            console.log('HTML:', html);
        } else {
            console.error('Expected HTML response but received:', contentType);
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export { fetchProtecData };