import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState("");
  const { user, setUser, ready } = useContext(UserContext);
  let { subpage } = useParams();
  subpage === undefined ? (subpage = "profile") : subpage;

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  

  if (!ready) {
    return "Loading...";
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return ready && !user && !redirect ? (
    <Navigate to={"/login"} />
  ) : (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
