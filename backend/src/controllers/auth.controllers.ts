import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { createAccessToken, decodeToken } from "../libs/jwt";

// Función para registrar un nuevo usuario
export const register = async (req: Request, res: Response) => {
  // Extraer datos del cuerpo de la solicitud
  const { firstName, lastName, email, password } = req.body;

  try {
    // Buscar si el email ya existe
    const useFound = await User.findOne({ email });
    if (useFound)
      return res.status(400).json({ message: "The email already exists" });

    // Generar un salt para el hashing de la contraseña
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    // Crear un nuevo usuario con los datos proporcionados
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: newPassword,
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    // Generar un token de acceso JWT con el ID del usuario
    const token = await createAccessToken({ id: savedUser._id });

    // Establecer el token como una cookie en la respuesta
    res.cookie("token", token, {
      httpOnly: false, // true en producción
      sameSite: "none",
      secure: true, 
    });

    // Enviar una respuesta JSON con los datos del usuario
    res.json({
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Función para iniciar sesión
export const login = async (req: Request, res: Response) => {
  // Extraer email y contraseña del cuerpo de la solicitud
  const { email, password } = req.body;

  try {
    // Buscar el usuario por email
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Comparar la contraseña proporcionada con la almacenada
    const matchPassword = bcrypt.compareSync(password, userFound.password);
    if (!matchPassword)
      return res.status(400).json({ message: "Invalid password" });

    // Generar un token de acceso JWT con el ID del usuario
    const token = await createAccessToken({ id: userFound._id });

    // Establecer el token como una cookie en la respuesta
    res.cookie("token", token, {
      httpOnly: false, // true en producción
      sameSite: "none",
      secure: true,
    });

    // Enviar una respuesta JSON con los datos del usuario
    res.json({
      id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      createdAt: userFound.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Función para obtener el perfil del usuario
export const profile = async (req: Request, res: Response) => {
  // Extraer el token de las cookies
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Decodificar el token
    const decoded = await decodeToken(token);

    // Verificar si el token es válido y contiene un ID de usuario
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      // Buscar el usuario por el ID decodificado del token
      const existingUser = await User.findById((decoded as JwtPayload).id);
      if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

      // Enviar una respuesta JSON con los datos del usuario
      res.json({
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Función para cerrar sesión
export const logout = async (_req: Request, res: Response) => {
  // Eliminar el token de la cookie estableciendo una fecha de expiración en el pasado
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  // Enviar una respuesta JSON indicando que se cerró sesión
  res.status(200).json({ message: "Logged out" });
};

// Función para verificar la autenticación
export const verify = async (req: Request, res: Response) => {
  // Extraer el token de las cookies
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Decodificar el token
    const decoded = await decodeToken(token);

    // Verificar si el token es válido y contiene un ID de usuario
    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      // Buscar el usuario por el ID decodificado del token
      const existingUser = await User.findById((decoded as JwtPayload).id);
      if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

      // Enviar una respuesta JSON con los datos del usuario
      res.json({
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
};