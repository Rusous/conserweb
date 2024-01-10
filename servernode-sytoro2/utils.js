import User from "./models/userModels.js";
import jwt from 'jsonwebtoken'

//middleware to check authentication
export const isAuth = async (req, res, next) => {

	let token;

  // console.log(req.headers.authorization.split(' ')[1])

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {

		try {
			token = req.headers.authorization.split(' ')[1];
      
      const decoded = jwt.verify(token, 'CLAVESECRETA')

			req.user = await User.findById(decoded.id).select("-password");

      if (req.user == null){
        return res.status(401).json({ message: "usuario no existento en base de datos" })
      }

			return next();
		} catch (error) {
			return res.status(404).json({ message: "hubo un error" });
		}
	}

	if (!token) {
		return res.status(401).json({ message: "no hay token(no autorizado)" });
	}

	next();
};

export const isAdmin = async (req, res, next) => {
	if (req.user.role === "admin") {
		return next();
	}

	res.status(401).json({ message: "solo administrador tiene acceso" });
};
