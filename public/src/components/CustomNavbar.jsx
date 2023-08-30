import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export default function CustomNavbar() {
    const { user, logOutUser } = useContext(AuthContext)

    return (
        <>
            <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }} >
                <Container>
                    <h2>
                        <Link to="/" className="link-light text-decoration-none" >
                            ChatApp
                        </Link>
                    </h2>
                    {
                        user && (<span className="text-warning">Logged in as {user?.username}</span>)
                    }

                    <Nav>
                        <Stack direction="horizontal" gap={3}>
                            {
                                user && (<>
                                    <Link onClick={() => logOutUser()} to="/login" className="link-light text-decoration-none" >
                                        Logout
                                    </Link>
                                </>)
                            }
                            {
                                !user && (<>  <Link to="/login" className="link-light text-decoration-none" >
                                    Login
                                </Link>
                                    <Link to="/register" className="link-light text-decoration-none" >
                                        Register
                                    </Link>
                                </>)
                            }
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>


        </>
    );
}
