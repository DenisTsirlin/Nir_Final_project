const deleteCustomer = async (customerId) => {
    try {
        const response = await fetch(`http://www.DenisTs.somee.com/api/CustomerRW/${customerId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete customer');
        }

        return response;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
};

export default deleteCustomer;
