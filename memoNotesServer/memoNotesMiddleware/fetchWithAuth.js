async function fetchWithAuth(url, options = {}) {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
        window.location.href = "/login";
        return;
    }

    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = `Bearer ${accessToken}`;

    let response = await fetch(url, options);

    if (response.status === 401) {
        console.log("Access token expired, trying to refresh...");

        const refreshResponse = await fetch("/refresh-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
        });

        if (refreshResponse.ok) {
            const { accessToken: newAccessToken } = await refreshResponse.json();
            localStorage.setItem("accessToken", newAccessToken);

            options.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return fetch(url, options);
        } else {
            // Refresh failed, log out user
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            return;
        }
    }

    return response;
}