import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function getMe() {
      await axios
        .get("http://localhost:4000/auth/me", {
          withCredentials: true,
        })
        .then((res) => setMe(res.data));
    }

    getMe();
  }, []);

  if (me) {
    return <p>hi {JSON.stringify(me)}</p>;
  }

  const googleClientId: string = process.env
    .REACT_APP_GOOGLE_CLIENT_ID as string;
  const authUrl: string = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fgoogle&client_id=${googleClientId}&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email`;
  return (
    <div className="App">
      <a href={authUrl}>LOGIN WITH GOOGLE</a>
    </div>
  );
}

export default App;
