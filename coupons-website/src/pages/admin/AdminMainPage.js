import React from 'react';

// import AllCompanies component that is displayed to the administrator immediately after logging on 
import AllCompanies from './companies_management/AllCompanies';

export function AdminPage() {

    return (
        <div>
            <AllCompanies />
        </div>
    );
};

export default AdminPage;