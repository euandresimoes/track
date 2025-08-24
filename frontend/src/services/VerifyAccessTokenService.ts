export class VerifyAccessTokenService {
    async execute() {
        if (!localStorage.getItem("accessToken")) {
            document.location.href = "/login";
        }
    }
}

const verifyAccessTokenService = new VerifyAccessTokenService();
export default verifyAccessTokenService;
