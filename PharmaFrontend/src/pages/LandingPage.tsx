import useAuth from "../state/store/useAuth"



const LandingPage = () => {

    const authStatus = useAuth(state => state.authState.status)
    const signout = useAuth(state => state.signout)



    function signOut() {
        signout();
    }

    return (
        <>
            <div>LandingPage</div>
            {authStatus == "authenticated" && <button onClick={signOut}>SignOut</button>}
        </>
    )
}

export default LandingPage