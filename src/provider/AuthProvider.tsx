"use client";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { toast } from "sonner";
type User = {
  _id: string;
  email: string;
  password: string;
  username: string;
  bio: string | null;
  profilePic: string | null;
  following: string[];
  followers: string[];
};
type contextType = {
  login: (email: string, password: string) => Promise<void>;
  signup: (
    username: string,
    email: string,
    password: string,
    bio: string
  ) => Promise<void>;
  user: User | null;
  setUser: Dispatch<SetStateAction<null | User>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<null | string>>;
};
type decodedToken = {
  data: User;
};

export const AuthContext = createContext<contextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const decodedToken: decodedToken = jwtDecode(localToken);
      setToken(localToken);
      setUser(decodedToken.data);
    }
  }, []);
  console.log(user);

  const signup = async (
    username: string,
    email: string,
    password: string,
    bio: string
  ) => {
    const response = await fetch("http://localhost:5555/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        bio: bio,
      }),
    });
    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res);
      toast.success("Signed Up");
      push("/");
    } else {
      toast.error("Cant Signed Up");
    }
  };

  const login = async (email: string, pass: string) => {
    const response = await fetch("http://localhost:5555/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    console.log(response);

    if (!response.ok) {
      toast.error("Didnt Joined");
    } else {
      const token = await response.json();
      localStorage.setItem("token", token);
      toast.success("joined");
      push("/");
    }
  };
  const values = {
    login: login,
    user: user,
    setUser: setUser,
    signup: signup,
    token: token,
    setToken: setToken,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Use auth context");
  }
  return authContext;
};
