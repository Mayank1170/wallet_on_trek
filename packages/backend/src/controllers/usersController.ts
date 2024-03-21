import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";
import { User } from "../types";

export const usersController = {
  getAllUsers: async (req: Request, res: Response) => {
    let { data, error } = await supabase.from("users").select("*");

    const users: User[] = data as User[];

    if (error) return res.status(500).json({ error: error.message });
    res.json(users);
  },

  addUser: async (req: Request, res: Response): Promise<void> => {
    const { username, wallet_address } = req.body;
    const { data, error } = await supabase
      .from("Users")
      .insert([{ username, wallet_address }]);

    if (error) {
      // Just call res.status().json() without 'return'
      res.status(500).json({ error: error.message });
      return;
    }

    if (data) {
      res.status(201).json(data[0]);
    } else {
      res.status(404).send("User was not added.");
    }
  },
};
