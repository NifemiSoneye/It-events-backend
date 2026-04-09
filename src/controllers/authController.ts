import Admin from "../model/Admin";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const handleLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    const { username, password }: { username: string; password: string } =
      req.body;

    if (!username || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
      return;
    }

    const foundUser = await Admin.findOne({ username }).exec();

    if (!foundUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const roles = foundUser.roles;

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" },
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? (foundUser.refreshToken ?? [])
      : (foundUser.refreshToken?.filter((rt) => rt !== cookies.jwt) ?? []);

    foundUser.refreshToken = [...newRefreshTokenArray, refreshToken];
    const result = await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: process.env.NODE_ENV === "production", //https
      sameSite: "lax", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    res.json({ accessToken });
  },
);

const handleRefresh = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      async (
        err: jwt.VerifyErrors | null,
        decoded: jwt.JwtPayload | string | undefined,
      ) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        if (!decoded || typeof decoded === "string") return res.sendStatus(403);
        const foundUser = await Admin.findOne({
          username: decoded.username,
          refreshToken: refreshToken,
        }).exec();
        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });
        const roles = foundUser.roles;
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" },
        );
        res.json({ accessToken });
      },
    );
  },
);

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt.trim();
  const foundUser = await Admin.findOne({
    refreshToken: { $in: [refreshToken] },
  }).exec();
  console.log("Found user:", foundUser);
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return res.sendStatus(403);
  }

  foundUser.refreshToken =
    foundUser.refreshToken?.filter((rt) => rt !== refreshToken) ?? [];
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Cookie cleared" });
};

export { handleLogin, handleRefresh, handleLogout };
