const { default: Link } = require("next/link")
import cookies from 'next-cookies';
import jwt from 'jsonwebtoken';
import { useState, useEffect } from 'react';


const Navbar = () => {
    const [user, setUser] = useState(null);

   
    return ( 
        <>
           
                <>
                    <Link href="/login">
                        Login
                    </Link>
                    <Link href="/signup">
                        Signup
                    </Link>
                </>
            
        </>
     );
}
 
export default Navbar;