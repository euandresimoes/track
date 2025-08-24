export class LoginService {
  async execute(props: { email: string; password: string }) {
    const body = {
      email: props.email,
      password: props.password,
    };

    const req = await fetch(`${import.meta.env.VITE_API_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await req.json();

    if (req.status === 404) {
      console.error(res.message);
      return;
    }

    if (req.status === 401) {
      console.error(res.message);
      return;
    }

    if (req.status === 201) {
      localStorage.setItem("accessToken", res.data.access_token);
      document.location.href = "/dashboard";
      return;
    }
  }
}

const loginService = new LoginService();
export default loginService;
