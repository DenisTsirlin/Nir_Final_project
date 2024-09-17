const register = async (email, password, firstName, lastName, birthDate, drivingLicense) => {
    try {
        const response = await fetch(
            'http://www.DenisTs.somee.com/api/CustomerRW',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,
                    First_Name: firstName,
                    Last_Name: lastName,
                    Birth_Day: birthDate,
                    Driving_License: drivingLicense
                }),
            }
        );
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error.message);
        throw error;
    }
};

export default register;
