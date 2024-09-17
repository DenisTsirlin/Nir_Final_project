const login = async (email, password) => {
    try {
        const response = await fetch(
            'http://DenisTs.somee.com/api/CustomerRW/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }), // העברת הנתונים ב-body
            }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw error;
    }
};

export default login;
