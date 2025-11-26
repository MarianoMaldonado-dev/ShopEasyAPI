import User from '../models/User.js';

export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Error. Usuario no encontrado. ¡Verifique los datos ingresados!' });
        }
        //Lógica para actualizar datos
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.address = req.body.address || user.address;
        //Lógica para cambiar la contraseña
        if (req.body.password) {
            user.password = req.body.password; // Se hace un pre('save') que se encarga de hashear la nueva contraseña
            user.requirePasswordChange = false; //NOTA: Ésta línea es necesaria para las modificaciones de contraseña
            //En el caso de que ocurra algún error o bug en el sistema por cualquiera que fuera el motivo, el bool pasa a 'true'
            //y al iniciar sesión con el email, se exige ingresar una contraseña nueva, no va a permitir navegar ni cerrar la vista hasta que no lo haga
            //De ésta manera, se evita el colapso del sistema.
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            address: updatedUser.address,
            token: req.headers.authorization.split(' ')[1] //Se envía el mismo token del usuario
        });
    } catch (error) {
        next(error);
    }
};

// GET /api/users - Metodo para listar usuarios (Solo Administradores)
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // Se filtra la contraseña para que no sea listada
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// DELETE /api/users/:id - Eliminar usuario por id (Solo Admin)
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Evitar que el admin se borre a sí mismo por error
        if (req.user.id === user._id.toString()) {
            return res.status(400).json({ message: 'No puedes eliminar tu propia cuenta de administrador desde aquí. Porfavor, comuníquese con su superior.' });
        }

        await user.deleteOne();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};