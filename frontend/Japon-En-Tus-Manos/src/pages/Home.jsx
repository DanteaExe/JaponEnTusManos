import { useState } from 'react';
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div>
                <h1>This is home page</h1>
            </div>

            <Link to="/login">
                <button style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
                    Ir al Login
                </button>
            </Link>
        </>
    );
}

export default Home;