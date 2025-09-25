"use client";
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
};

export const AuthContext = createContext<contextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      setUser(JSON.parse(userItem));
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
    const user = await response.json();
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
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
      console.log("gg");
      toast.error("Didnt Joined");
    } else {
      const user = await response.json();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(" joined");
    }
  };
  const values = {
    login: login,
    user: user,
    setUser: setUser,
    signup: signup,
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
