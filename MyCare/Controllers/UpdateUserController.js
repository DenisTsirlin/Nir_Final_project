const updateUser = async (userDetails) => {
    try {
        const response = await fetch('http://www.DenisTs.somee.com/api/CustomerRW/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        // הדפס את הסטטוס של התגובה
        console.log('Response Status:', response.status);

        if (!response.ok) {
            const errorText = await response.text(); // קרא את התגובה כטקסט
            console.error('Fetch Error:', errorText);
            throw new Error('Network response was not ok');
        }

        // בדוק אם התגובה היא JSON
        const result = await response.json();
        console.log('Response JSON:', result);
        return result;
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw error;
    }
};

export default updateUser;
