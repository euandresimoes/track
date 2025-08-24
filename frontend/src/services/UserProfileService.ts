export type UserProfile = {
  id: string;
  display_name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export class UserProfileService {
  async execute(): Promise<UserProfile> {
    const req = await fetch(`${import.meta.env.VITE_API_URL}/v1/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    const res = await req.json();

    if (req.status === 200) {
      console.log(res);
      return res.data.user as UserProfile;
    }
  }
}

const userProfileService = new UserProfileService();
export default userProfileService;
