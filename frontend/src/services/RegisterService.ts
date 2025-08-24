export class RegisterService {
  async execute(props: {
    displayName: string;
    email: string;
    password: string;
  }) {
    const body = {
      display_name: props.displayName,
      email: props.email,
      password: props.password,
    };

    const req = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const res = await req.json();

    if (req.status === 409) {
      console.error(res.message);
      return;
    }

    if (req.status === 201) {
      document.location.href = "/login";
      return;
    }
  }
}

const registerService = new RegisterService();
export default registerService;
