import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      navigate("/");
      return;
    }

    const fetchTokens = async () => {
      const domain = import.meta.env.VITE_AUTH0_DOMAIN;
      const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
      const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code,
        redirect_uri: redirectUri,
      });

      try {
        const res = await fetch(`https://${domain}/oauth/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });

        const data = await res.json();

        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("id_token", data.id_token);
          navigate("/");
        } else {
          console.error("Error obteniendo tokens", data);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    fetchTokens();
  }, [navigate]);

  return <div>Cargando autenticación...</div>;
}
