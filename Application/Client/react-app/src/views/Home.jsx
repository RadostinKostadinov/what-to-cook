import { redirect } from "react-router-dom";
import HttpService from "../services/http/HttpService";

export default function Home() {
  return (
    <div>
      <h2>Home page</h2>
    </div>
  );
}

export async function loader() {
  const api = HttpService.getInstance();

  try {
    await api.User.sendTestAuthRequest();
  } catch (error) {
    return redirect("/auth/login");
  }

  return null;
}
